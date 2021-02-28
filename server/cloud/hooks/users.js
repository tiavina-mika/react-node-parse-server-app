"use strict";

const moment = require('moment');
const Joi = require('joi');

const validation = require('../utils/validation.js');
const { parseFunction, fromBO, toDateString, capitalizeCase } = require('../utils/utils');
const { decrypt } = require('../utils/cryptoUtils');
const roleUtils = require('../utils/roleUtils');
const { subscriptionEvent } = require('../log');
const { default: slugify } = require('slugify');

const regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const schemaForUser = {
	firstName: Joi.string().optional(),
	lastName: Joi.string().required(),
	email: Joi.string().regex(regexEmail).required(),
	username: Joi.string().min(4).max(100).required(),
	password: Joi.any(), // later checked using validatePassword
};

const schemaForChangePassword = {
	email: Joi.string().regex(regexEmail).required(),
	password: Joi.string().min(8).max(45).required(),
	confirmedPassword: Joi.ref('password'),
};

const schemaForPasswordUpdate = {
	token: Joi.string().required(),
	username: Joi.string().required(),
	newPassword: Joi.any(), // later checked using validatePassword
 // for user create from BO
	firstName: Joi.string().optional(),
	lastName: Joi.string().optional()
};

/**
 * for debugging socialLogin
 * @param username
 * @param sessionToken
 * @param log
 * @returns {Promise<void>}
 */
const checkSessionToken = async ({ username, sessionToken }) => {
	const user = await new Parse.Query(Parse.User)
		.equalTo('username', username)
		.select('username')
		.first(USE_MASTER_KEY);
	const userSessionToken = user ? user.getSessionToken() : undefined;

	let savedSessionToken;
	const currentSession = await new Parse.Query('_Session')
		.equalTo('user', user)
		.addDescending('_created_at')
		.first(USE_MASTER_KEY);
	if (currentSession) {
		savedSessionToken = currentSession.get('sessionToken');
	}

	if (LOCAL) {
		console.log({ sessionToken, user, userSessionToken, savedSessionToken });
	}
}

//-------------------------------------------------------//
//------------------- administrators --------------------//
//-------------------------------------------------------//
/**
 * returns a true boolean if the current user is an administrator
 */
Parse.Cloud.define('isAdministrator', parseFunction(async request => {
	return await roleUtils.isAdministratorOrBetter(request);
}));

Parse.Cloud.define('signUp', parseFunction(async request => {
	// there's no user or sessionToken in the request

	const { password, firstName, lastName, email } = request.params;

	//---- user exists ? ----//
	let sessionToken;
	let user = await new Parse.Query(Parse.User)
		.equalTo('username', email)
		.first(USE_MASTER_KEY);

	//-----------------------//
	//---- User creation ----//
	//-----------------------//
	user = new Parse.User();
	// IMPORTANT : must be the same code as the client's actions/users.js' createUser
	user.set('username', email);
	user.set('password', password);
	user.set('email', email);
	user.set('slug', slugify(firstName, { lower: true }));

	firstName && user.set('firstName', capitalizeCase(firstName));
	lastName && user.set('lastName', capitalizeCase(lastName));

	//---- schema validation ----//
	validation.checkValid(user, schemaForUser);
	validation.checkPassword(user);

	await user.signUp(null, USE_MASTER_KEY);
	sessionToken = user.getSessionToken();

	await checkSessionToken({ username: email, sessionToken });

	//----------------------------------//
	//------- Administrator role -------//
	//----------------------------------//

	//---- role retrieval/creation ----//
	let adminRole = await new Parse.Query(Parse.Role)
		.equalTo("name", "Administrator")
		.first(USE_MASTER_KEY);

	if (!adminRole) {
		const adminRoleACL = new Parse.ACL();
		adminRoleACL.setRoleReadAccess("Administrator", true);
		adminRoleACL.setPublicWriteAccess(false); // only masterKey
		adminRole = new Parse.Role("Administrator", adminRoleACL);
		// we don't need to save it now, it is saved below anyway
	}

	const defaultAdminEmails = process.env.DEFAULT_ADMIN_EMAILS.split(',');

	if (!defaultAdminEmails.find(email => email.trim() === user.get('email'))) return;

	// ---- adding in role ---- //
	user.set('active', true);
	adminRole.getUsers().add(user);
	await adminRole.save(null, USE_MASTER_KEY);
}));

Parse.Cloud.define('addAdministrator', parseFunction(async request => {
	console.log('request: ', request);

	/*
	eg of query parameters:
	{ "username": "admin", "password": "eatzybyfoodcheri", "firstName": "n/a", "lastName": "n/a", "email": "hello@seazon.fr" }
	 */
	const { password, firstName, lastName, email } = request.params;

	//---- actual user creation ----//
	const newUser = new Parse.User();
	newUser.set("username", email);
	newUser.set("password", password);
	newUser.set("firstName", firstName);
	newUser.set("lastName", lastName);
	newUser.set("email", email);
	newUser.set('fromBo', true);
	newUser.set('slug', slugify(firstName, { lower: true }));

	//---- schema validation ----//
	validation.checkValid(newUser, schemaForUser);
	validation.checkPassword(newUser);

	await newUser.signUp(null, USE_MASTER_KEY);

	//----------------------------------//
	//------- Administrator role -------//
	//----------------------------------//

	//---- role retrieval/creation ----//
	const adminRole = await new Parse.Query(Parse.Role)
		.equalTo("name", "Administrator")
		.first(USE_MASTER_KEY);

	//---- adding in role ----//
	if (adminRole) {
		adminRole.getUsers().add(newUser);
		await adminRole.save(null, USE_MASTER_KEY);		
	}

	return newUser;
}));


//-------------------------------------------------------//
//------------- checking saved username -----------------//
//-------------------------------------------------------//
/**
 * check if username exists already into "_User" collection
 * @param username
 * @returns {Promise<boolean>}
 */
async function checkIsAlreadySavedUsername(username) {
	// NOTE : count() is the faster than first()
	const count = await new Parse.Query(Parse.User)
		.equalTo('username', username)
		.limit(1)
		.count(USE_MASTER_KEY);
	return !!count;
}

Parse.Cloud.define('isAlreadySavedUsername',
	parseFunction(async request => {
		const { username } = request.params;
		if (!username) return false;
		return await checkIsAlreadySavedUsername(username);
	})
);

//-------------------------------------------------------//
//------------------ before/afterSave -------------------//
//-------------------------------------------------------//

Parse.Cloud.afterSave(Parse.User, parseFunction(async request => {
	const user = request.object;

	//---- ACL ----//
	// . read and write access for admins and the user itself
	// . can't be done in beforeSave because we don't have a user id yet
	const defaultAdminEmails = process.env.DEFAULT_ADMIN_EMAILS.split(',');

	if (defaultAdminEmails.find(email => email === user.get('email')) || user.get('fromBo')) {
		await setACLForUser(user);
	}

	try {
		//---- event log on subscription ----//
		// save event log on new user Subscribe
		// IMPORTANT : it should be in afterSave because user is a pointer into Log and it should be saved
		const subscriptionLog = await new Parse.Query('Log')
			.equalTo('user', user)
			.equalTo('type', 'user')
			.equalTo('action', 'add')
			.limit(1)
			.count(USE_MASTER_KEY);

		if (toDateString(user.createdAt) === toDateString() && !subscriptionLog) {
			await subscriptionEvent(user);
		}
	} catch (err) {
		console.error('Error while logging subscription : ' + err.message);
	}
}));

//-------------------------------------------------------//
//---------------------- Deletion -----------------------//
//-------------------------------------------------------//
// only itself and the master key can delete a user

/**
 * mark 'deleted' flag but not remove user from database
 */
Parse.Cloud.define('deleteUser', parseFunction(async request => {
	//---- security check ----//
	const isManager = await roleUtils.hasRoleAsManager(request.user);
	if (!isManager) {
		throw new Error("L'utilisateur doit être un administrateur ou un manager.");
	}

	const userId = request.params.userId;
	const user = await new Parse.Query(Parse.User)
		.equalTo('objectId', userId)
		.select('username')
		.select('firstName')
		.select('lastName')
		.first(USE_MASTER_KEY);

	//---- sending mail notification ----//
	// see https://foodcheri.atlassian.net/browse/SZN-903
	// IMPORTANT : it should be sent before updating user
	const firstName = user.get('firstName');
	const email = user.get('username');
	const name = firstName + ' ' + user.get('lastName');
	const variables = {
		firstname: firstName,
		customerEmail: email
	};
	await mailjet.sendMail({
		templateId: 1084905,
		email,
		name,
		subject: firstName + ', suppression de votre compte et de vos données personnelles',
		variables
	});

	//---- user with flag 'deleted' ----//
	user.set('deleted', true);
	const str = email.split('@');
	const deletedAt = moment().format('YYYYMMDD');
	const newUserName = str[0] + '.deleted-' + deletedAt + '@' + str[1];
	user.set('username', newUserName);
	user.set('email', newUserName);
	await user.save(null, USE_MASTER_KEY);
}));

/**
 * remove user from database (only for test users)
 */
Parse.Cloud.define('destroyUser', parseFunction(async request => {
	//---- security check ----//
	const admin = request.user;
	await roleUtils.checkAdministrator(admin);

	const userId = request.params.userId;
	const user = await new Parse.Query(Parse.User)
		.equalTo('objectId', userId)
		.first(USE_MASTER_KEY);

	//---- user destroy ----//
	await user.destroy(USE_MASTER_KEY); // the afterDelete hook also deletes the Plan
}));


/**
 * reactivated user (with flag deleted)
 */
Parse.Cloud.define('reactivateUser', parseFunction(async request => {
	//---- security check ----//
	const admin = request.user;
	await roleUtils.checkAdministrator(admin);

	const userId = request.params.userId;
	const deletedUser = await new Parse.Query(Parse.User)
		.equalTo('objectId', userId)
		.equalTo('deleted', true)
		.first(USE_MASTER_KEY);

	//---- user reactivation ----//
	if (deletedUser) {
		deletedUser.unset('deleted');
		await deletedUser.save(null, USE_MASTER_KEY);
	}
}));

//---------------------------------------------------------------//
//---------------- beforeDelete/afterDelete ---------------------//
//---------------------------------------------------------------//
/**
 * only to prevent the user from deleting its own account
 */
Parse.Cloud.beforeDelete(Parse.User, async request => {
	// this deletion must be called from the 'deleteUser' cloud function
	if (!request.master) {
		throw 'Only an administrator can delete a user';
	}
});

/**
 * special resetPassword the removes the User's 'brandNew' attribute (used for invites)
 */
Parse.Cloud.define('resetPassword', parseFunction(async request => {
	const sessionToken = request.user.getSessionToken();
	//---- email in request ? ----//
	const email = request.params.email;
	if (!email) {
		throw 'Missing email';
	}

	//---- user searching ----//
	const user = await new Parse.Query(Parse.User)
		.equalTo('username', email)
		.first({ sessionToken });

	if (!user) {
		throw 'User not found with email ' + email;
	}

	//---- 'brandNew' removal ----//
	if (user.get('brandNew')) {
		user.unset('brandNew');
		await user.save(null, { sessionToken });
	}

	//---- actual requestPasswordReset ----//
	await Parse.User.requestPasswordReset(email);
}));


//---------------------------------------------------------------//
//----------------------- Password/Login ------------------------//
//---------------------------------------------------------------//
// only itself and the master key can delete a user
Parse.Cloud.define('changePassword', parseFunction(async request => {
	const email = request.params.email;
	const password = request.params.password;
	const confirmedPassword = request.params.confirmPassword;
	
	schemaForChangePassword.validate({
		email,
		password,
		confirmedPassword,
	})

	//---- user retrieval ----//
	const user  = await new Parse.Query(Parse.User)
		.equalTo('email', email)
		.first();

	if (!user) {
		throw new Error('User email not found');
	}

	//---- password update ----//
	user.set('password', password);
	const newUser = await user.save(null, USE_MASTER_KEY);
	return newUser;
}));


Parse.Cloud.define('decryptSessionToken', parseFunction(async request => {
	const { encryptedSessionToken } = request.params;
	const tokenAndTimestamp = decrypt(encryptedSessionToken);

	const parts = tokenAndTimestamp.split('|');
	const sessionToken = parts[0];
	const timestamp = parts[1];

	//---- timestamp security ----//
	if (timestamp < Date.now - 1000 * 60) {
		throw new Error('Session Token expired');
	}

	return { sessionToken };
}));

//---------------------------------------------------------------//
//-------------- setting pointer user into order ----------------//
//---------------------------------------------------------------//
Parse.Cloud.define('fixACLForUsers', parseFunction(async request => {
	//-------------------------------------------------------//
	//------------------ checking security ------------------//
	//-------------------------------------------------------//
	const admin = request.user;
	await roleUtils.checkAdministrator(admin);

	const res = {
		userCount: 0,
		userMarked: 0
	};

	const users = await new Parse.Query(Parse.User)
		.notEqualTo('deleted', true)
		.addDescending('_created_at')
		.limit(200)
		.find(USE_MASTER_KEY);

	if (!users) {
		return res;
	}

	for (const user of users) {
		res.userCount++;

		if (!isACLAlreadyUpdated(user)) {
			console.log('ACL should be updated for : ' + user.id);
			await setACLForUser(user);
			res.userMarked++
		}
	}

	return res;
}));

/**
 * check if user's ACL is already updated
 * @param user
 * @returns {boolean}
 */
function isACLAlreadyUpdated(user) {
	if (!user) return false;

	// ACL saved into user
	const savedACL = user.getACL();

	// default ACL
	const defaultACL = getDefaultUserACL(user);

	// compare to default ACL
	return savedACL.equals(defaultACL);
}

/**
 * get default ACL for collection User
 * @param user
 * @returns {Parse.ACL}
 */
const getDefaultUserACL = (user) => {
	const acl = new Parse.ACL();
	// all managers can read Users

	// only Administrator and Customer Manager can update user properties from BO
	acl.setRoleWriteAccess("Administrator", true);

	// add its self
	if (user) {
		acl.setReadAccess(user, true);
		acl.setWriteAccess(user, true);
	}
	return acl;
}

/**
 * set ACL for selected user
 * @param user
 * @returns {Promise<void>}
 */
const setACLForUser = async (user) => {
	if (!user) return null;

	// default ACL
	const acl = getDefaultUserACL(user);
	user.setACL(acl);
	await user.save(null, USE_MASTER_KEY);
}

//---------------------------------------------------------------//
//-------------------- get user form roles ----------------------//
//---------------------------------------------------------------//
Parse.Cloud.define('getUsersFromRole',
	fromBO(async params => {
		//---- params ----//
		const { roleName } = params;
		if (!roleName) {
			// do nothing
			return [];
		}

		const { getUsersFromRoles } = require('../roleUtils');
		return await getUsersFromRoles([roleName]);
	})
);

/**
 * find user before register
 */
Parse.Cloud.define('getUserBy', parseFunction(async request => {
	//---- params ----//
	const { email } = request.params;
	if (!email) {
		return null;
	}

	//---- user ----//
	const user = await new Parse.Query(Parse.User).equalTo('username', email).first(USE_MASTER_KEY);

	return { success: !!user, user };
}));

