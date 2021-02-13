const Config = require('../../node_modules/parse-server/lib/Config');
const moment = require('moment');
const { deburr } = require('lodash');
const iconv = require('iconv-lite');
const roleUtils = require('./roleUtils');

/**
 * check if it's null ( 0, '', null, undefined, {}, [] )
 * @param item
 * @returns {boolean}
 */
function isNull(item) {
	// NOTE : typeof null = 'object', typeof undefined = 'undefined'
	// see Loose Equality Comparisons With == at ( https://www.sitepoint.com/javascript-truthy-falsy )
	const typeOfValue = typeof item;
	switch (typeOfValue) {
		case 'string':
			return item.trim() === '';
		case 'object':
			return Object.is(item, null) || Object.values(item).every(val => isNull(val));
		case 'number':
			return !item;
		default:
			return item == null;
	}
}

function sort(array, keySupplier) {
	array.sort((item1, item2) => {
		const item1Key = keySupplier(item1);
		const item2Key = keySupplier(item2);
		if (item1Key < item2Key) return -1;
		if (item1Key > item2Key) return 1;
		return 0;
	});
	return array;
}

function shallowEquals(a, b) {
	for (let i in a) if (!(i in b)) return false;
	for (let i in b) if (a[i] !== b[i]) return false;
	return true;
}

function toNumber(valueStr) {
	if (!valueStr) return 0;
	if (typeof valueStr === 'number') return valueStr;
	return valueStr ? parseInt(valueStr, 10) : 0;
}

function numberFormat(value) {
	if (!value) return 0;
	const newVal = typeof value === 'number' && value % 1 !== 0 ? toDecimal(value) : parseInt(value, 10);
	return newVal || 0;
}

function toInt(value) {
	return value ? parseInt(value, 10) : 0;
}

function toDecimal(value, afterComma = 2) {
	if (!value) {
		return 0;
	} else if (typeof value === 'number') {
		 return parseFloat(value.toFixed(afterComma));
	}
	// replace ',' to '.'
	const str = value.includes(',') ? value.replace(',', '.') : value;
	const res = parseFloat(str);
	if (!isNaN(res)) {
		return toDecimal(res, afterComma); // to get a good format decimal
	}
	return 0;
}

function priceFormatString(price, unity = '€') {
	const str = [];
	if (typeof price === 'string') {
		price = toDecimal(price);
	}
	str.push(price.toFixed(2));
	str.push(unity.trim());
	return str.join(' ');
}


/**
 * get french format for decimal
 * @param price
 * @param currency
 * @returns {string} like 78,90
 */
function toFrFormatStrWithComma(price, currency = '€') {
	if (!price) return '';
	const priceStr = typeof price === 'number' ? price.toFixed(2) : price;
	const parts = priceStr.split('.');
	if (parts.length > 1) {

		const partsOne = parts[1] === '00' ? '' : parts[1];
		// add '0' at the end if one digit into centime
		const formattedPartsOne = partsOne.length === 1 ? partsOne + '0' : partsOne;
		return parts[0] + (formattedPartsOne.length ? ',' : '') + formattedPartsOne + ' ' + currency;
	} else {
		return price + ' ' + currency;
	}
}

function toDate(momentOrDateOrString) {
	if (momentOrDateOrString == null) {
		return undefined;
	} else if (typeof momentOrDateOrString === 'string') {
		let [year, month, day] = momentOrDateOrString.split("-");
		if (momentOrDateOrString.includes('/')) {
			// french date DD/MM/YY
			[day, month, year] = momentOrDateOrString.split("/");
		}
		return new Date(year, month - 1, day);
	} else if (moment.isMoment(momentOrDateOrString)) {
		return momentOrDateOrString.toDate();
	} else {
		return momentOrDateOrString;
	}
}

function toMoment(momentOrDateOrString) {
	if (momentOrDateOrString == null) {
		return moment();
	} else if (moment.isMoment(momentOrDateOrString)) {
		//---- moment ----//
		return momentOrDateOrString;
	} else if (typeof momentOrDateOrString === 'string') {
		//---- string ----//
		return moment(momentOrDateOrString, 'YYYY-MM-DD');
	} else {
		//---- date ----//
		return moment(momentOrDateOrString);
	}
}

function toIndexDateString(momentOrDateOrString) {
	return toMoment(momentOrDateOrString).format('YYYYMMDD');
}
function toDateString(momentOrDateOrString) {
	return toMoment(momentOrDateOrString).format('YYYY-MM-DD');
}
function toFrDateString(momentOrDateOrString, withSlash = false) {
	const strFormat = withSlash ? 'DD/MM/YYYY' : 'DD-MM-YYYY';
	return toMoment(momentOrDateOrString).format(strFormat);
}
function toLongDateString(momentOrDateOrString) {
	return toMoment(momentOrDateOrString).format('YYYY-MM-DD HH:mm');
}
function toDateStringLogName(momentOrDateOrString) {
	return toMoment(momentOrDateOrString).format('YYYY-MM-DD_HH-mm');
}
function getDayOfWeek(dateOrMomentOrString) {
	return toMoment(dateOrMomentOrString).day();
}

function toShortDateString(date, withYear = false) {
	const dateFormat = withYear ? 'DD/MM/YY' : 'DD/MM';
	return toMoment(date).format(dateFormat);
}
function toFrDateTimeString(momentOrDateOrString, withDoubleDots = true, withPreposition = false) {
	let dateTimeStr = toMoment(momentOrDateOrString).format('DD/MM/YY - HH:mm');
	if (!withDoubleDots) {
		dateTimeStr = dateTimeStr.replace(':', 'h');
	}
	if (withPreposition) {
		dateTimeStr = dateTimeStr.replace('-', 'à');
	}
	return dateTimeStr;
}
function toTime(momentOrDateOrString) {
	return toMoment(momentOrDateOrString).format('HH:mm');
}
//--------------------------------------------------------------------------------//
//--------------------------- string Functions -----------------------------------//
//--------------------------------------------------------------------------------//
//to capitalize only first letter
function capitalizeFirstLetter(string) {
	if (string == null || !string.length) {
		return string;
	}
	return string.charAt(0).toUpperCase() + string.slice(1);
}

//to capitalize all first letter of each word
function capitalizeCase(string) {
	if (string == null || !string.length) {
		return string;
	}
	return string.toLowerCase().split(' ').map(word =>
		word[0].toUpperCase() + word.substr(1)
	).join(' ');
}


//--------------------------------------------------------------------------------//
//----------------------------- Job Functions ------------------------------------//
//--------------------------------------------------------------------------------//
function getRestHeaders() {
	return {
		'X-Parse-Application-Id': Parse.applicationId,
		'X-Parse-Master-Key': Parse.masterKey
	}
}

function parseGetString(parseObj, propertyName, defaultValue = '') {
	if (!parseObj) {
		return defaultValue;
	}
	const value = parseObj.get(propertyName);
	if (value == null) {
		return defaultValue;
	}
	return value;
}

/**
 * . corrects an issue with dirty() that always return true when the object is new,
 * . so dirty can return true for a property that's not returned by dirtyKeys()
 * @param parseObj
 * @param propertyName
 * @returns {*}
 */
function isDirty(parseObj, propertyName) {
	if (parseObj.isNew()) {
		return parseObj.get(propertyName) != null; // dirty() always returns true there
	} else {
		return parseObj.dirty(propertyName);
	}
}

/**
 * there was a value before and it has changed
 * @param request
 * @param propertyName
 * @returns {boolean}
 */
function isModified(request, propertyName) {
	const parseObject = request.object;
	const original = request.original;
	if (parseObject.isNew() || !original || original.get(propertyName) == null) {
		// there was no value before
		return false;
	} else {
		// it has been touched
		return parseObject.dirty(propertyName);
	}
}

/**
 * returns the security options passed by Parse call (like get, save...)
 * @param request the express request object
 * @returns {*}
 */
function getParseCallOptions(request) {
	//---- sessionToken or masterKey ----//
	if (LOCAL) {
		// for tests
		return USE_MASTER_KEY;
	} else {
		const sessionToken = request.query.sessionToken;
		if (!sessionToken) {
			throw new Error('Missing sessionToken');
		}
		return { sessionToken };
	}
}

function getRelated(parseObject, propertyName, throwError = true) {
	const related = parseObject.get(propertyName);
	if (related.createdAt) {
		return related;
	}
	if (throwError) {
		throw new Error("The parse object of class: " + parseObject.className + " and id " + parseObject.id + " doesn't contain a fetched " + propertyName);
	}
	return null;
}

//--------------------------------------------------------------------------------//
//--------------------------- Parse Functions ------------------------------------//
//--------------------------------------------------------------------------------//

function parseFunction(innerFunction) {
	return async (request, ) => {
		try {
			let result = await innerFunction(request);
			if (result == null) {
				result = 'ok';
			}
			return result;
		} catch (error) {
			if (global.LOCAL) {
				console.trace(error);
			}
			let message;
			if (error) {
				message = error.message;
			} else {
				message = 'Error inconnue';
				request.logger(new Error().stack);
			}
			return message;//throw message;
		}
	}
}

/**
 * handles mostly security
 * Parse.Function on users can be call from the BO (by an admin), or by the front (for the user itself)
 * @param action signature (user, otherParams) no userId is passed
 * @returns {function(*=, *)}
 */
function onUser(action) {
	return parseFunction(async request => {
		let { userId, ...otherParams } = request.params;
		let user = request.user;

		//------------------------------------------------------//
		//----------------- checking security ------------------//
		//------------------------------------------------------//
		// userId is only sent when called from the BO
		if (userId) {
			const isAdministratorOrBetter = await roleUtils.isAdministratorOrBetter(request);
			const isManager = await roleUtils.hasRoleAsManager(request.user);
			if (!isAdministratorOrBetter && !isManager) {
				// comes from the front (or is a security attack)
				if (userId !== user.id) {
					throw new Error("L'utilisateur doit être un administrateur ou lui-même.");
				} else {
					// the client has sent a userId (it shouldn't)
					// userId = undefined;
				}
			} else {
				// user selected on BO
				user = await new Parse.Query(Parse.User).equalTo('objectId', userId).first(USE_MASTER_KEY);
				if (!user || user.get('deleted')) {
					throw new Error('Missing user (or deleted) with userId: ' + userId);
				}
			}
		}

		return action(user, otherParams);
	});
}

/**
 * handles security
 * @param action signature (params):any
 * @returns {*}
 */
function fromBO(action) {
	return parseFunction(async request => {
		const isManager = await roleUtils.hasRoleAsManager(request.user);
		if (!isManager) {
			throw new Error("L'utilisateur doit être un administrateur ou un manager.");
		}
		return action(request.params, request); // the second argument is rarely used
	});
}
//--------------------------------------------------------------------------------//

async function getEMail(user) {
	let email = user.get('email');
	if (email) {
		return email;
	}
	const userWithEmail = await new Parse.Query(Parse.User)
		.select("email")
		.get(user.id, { useMasterKey: true });
	return userWithEmail.get('email');
}

/**
 * . creates a session using the masterKey
 * . code taken from Parse.UsersRouter's handleLogIn
 * @param {String} userId
 * @param {String} authProvider can be 'password' or 'facebook' (or 'google'...)
 * @param {String} installationId
 * @return {String} the sessionToken
 */
function serverLogin({ userId, authProvider, installationId }) {
	// if we put Auth on top of this file, it's too early and throws an exception
	const Auth = require('../node_modules/parse-server/lib/Auth');

	const config = Config.get(Parse.applicationId);
	const { sessionData, createSession } = Auth.createSession(config, {
		userId: userId,
		createdWith: {
			action: 'login',
			authProvider
		},
		installationId
	});

	createSession();
	return sessionData.sessionToken;
}

/**
 *
 * @param username
 * @param password
 * @returns {Promise<Object>} a Promise resolving to an Object representing the user
 */
async function restLogin({ username, password }) {
	return await rp.post({
		url: Parse.serverURL + '/login',
		headers: getRestHeaders(),
		body: {
			username,
			password
		},
		json: true
	});
}

async function getUserForSessionToken(sessionToken) {
	const Auth = require('../node_modules/parse-server/lib/Auth');

	const config = Config.get(Parse.applicationId);
	const auth = await Auth.getAuthForSessionToken({ config, sessionToken });
	return auth.user;
}


//-------------------------------------------------------------------//
//------------------- Direct MongoDB operations ---------------------//
//-------------------------------------------------------------------//
function getDatabaseController() {
	const config = Config.get(Parse.applicationId);
	return config.database;
}

async function getMongoCollection(className) {
	const mongoAdapter = getDatabaseController().adapter;
	await mongoAdapter.connect();
	return mongoAdapter.database.collection(className);
}

/**
 * to execute directly aggregate pipeline 
 * @param {string} className 
 * @param {Array} pipeline
 * @param {boolean} [withWeakCollation] (only used if necessary)
 */
async function aggregate(className, pipeline, withWeakCollation = false) {
	//---- $ stage name adding ----//
	pipeline = pipeline.map(stage => {
		// stage is an object with a single key
		const stageName = Object.keys(stage)[0];
		return { ['$' + stageName]: stage[stageName] };
	});

	//---- configuration ----//
	const collection = await getMongoCollection(className);

	//---- collation setting ----//
	const options = {};
	if (withWeakCollation) {
		options.collation = { locale: 'fr', strength: 1 };
	}
	//---- aggregate execution ----//
	return await collection.aggregate(pipeline, options).toArray();
}

/**
 *
 * @param className
 * @param {Object} query in the form of the structure
 * @param {Object} data can contain '__op' operation (or just simple values)
 * @returns {Promise<*>}
 */
async function update(className, query, data) {
	// 'true' : the skipSanitization argument (otherwise we don't get the result)
	// see parse's DatabaseController.update source
	try {
		return await getDatabaseController().update(className, query, data, {}, true);
	} catch (err) {
		if (err.code === Parse.Error.OBJECT_NOT_FOUND) {
			// normal, just not found
			return null;
		} else {
			// other error, we rethrow it
			throw err;
		}
	}
}
//-------------------------------------------------------------------//

/**
 *
 * @param ids
 * @param queryCreator
 * @return {Array} the fetched objects in the same order than the ids input array
 */
async function fetchMany(ids, queryCreator) {
	//---- query ----//
	const query = queryCreator(ids);
	const objects = await query.limit(1000).find(USE_MASTER_KEY);

	//---- objectById ----//
	const objectById = new Map();
	objects.forEach(obj => objectById.set(obj.id, obj));

	//---- result ----//
	const result = [];
	ids.forEach(id => {
		const obj = objectById.get(id);
		obj && result.push(obj);
	});

	return result;
}

/**
 * @param parseObjects
 * @returns {Map<String, Parse.Object>} a Map containing the Parse.Objects by id
 */
function indexParseObjects(parseObjects) {
	const objectById = new Map();
	parseObjects.forEach(obj => objectById.set(obj.id, obj));
	return objectById;
}

/**
 * decode base64 encoded string (used mainly to decode JWT token)
 * @param {String} encodedString 
 * @returns {String}
 */
function decode64(encodedString) {
	return Buffer.from(encodedString, 'base64').toString('binary');
}

/**
 * Create a safe filename by deleting \/:*?"<>|
 * @param {String} str 
 * @param {String} separator 
 */
function slugify(str, separator = '-') {
	str = str.trim();

	return str.replace(/^[\\//:*?<>|]/g, '')
		.replace('œ', 'oe') // invalid chars
		.replace('Œ', 'Oe') // invalid chars
		.replace(/[\\//:*?<>|]/g, separator)
		.replace(/["']/g, '')
		.replace(/\s+/g, ' ');
}

/**
 * normalize text for comparison purpose
 * @param {String} str 
 * @returns {String}
 */
function normalizeText(str = '') {
	str = str.trim();
	str = str.toLowerCase();
	str = deburr(str); // convert Latin-1 Supplement and Latin Extended-A letters to basic Latin letters and removing combining diacritical marks. eg: é => e
	str = str.replace(/\s+/g, ' '); // convert multiple escape characters into one
	return str;
}

/**
 * convert some address parts to its long name, eg: av becomes avenue
 * @param {String} str 
 * @returns {String}
 */
function normalizeAddress(str = '') {
	str = str
		.replace(/(\sav.\s)|(\sav\s)/gi, ' avenue ')
		.replace(/(\sboul.\s)|(\sboul\s)|(\sbld\s)|(\sbld\s)/gi, ' boulevard ')
		.replace(/(\spl.\s)|(\spl\s)/gi, ' place ');
	return str;
}


//----- query combination -----//

function greaterThanIfExists({ query, property, value, strict = false }) {
	const operator = strict ? 'greaterThan' : 'greaterThanOrEqualTo';
	return createComparisonQuery({ query, property, value, operator });
}

function lessThanIfExists({ query, property, value, strict = false }) {
	const operator = strict ? 'lessThan' : 'lessThanOrEqualTo';
	return createComparisonQuery({ query, property, value, operator });
}

function equalToIfExists({ query, property, value }) {
	return createComparisonQuery({ query, property, value, operator: 'equalTo' });
}

function createComparisonQuery({ query, property, value, operator }) {
	const doesNotExistsQuery = new Parse.Query(query.className).doesNotExist(property);
	const operatorQuery = new Parse.Query(query.className)[operator](property, value);
	return Parse.Query.or(doesNotExistsQuery, operatorQuery);
}

function randomString() {
	return Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6);
}

//to uppercase
function uppercase(str) {
	if (!str || typeof str !== 'string') return '';
	return str.toUpperCase();
}

/**
 * encode CSV to iso-8859
 * @param {string} dataStr
 * @returns {*}
 */
function encodeCSV(dataStr) {
	// . encoding in Node.js is complicated (see https://kev.inburke.com/kevin/node-js-string-encoding/ )
	// . internally, it's UTF-16
	// . express.js uses iconv-lite internally
	return iconv.encode(dataStr, 'iso-8859-1');
}

/**
 * export lines into CSV file
 * @param lines
 * @param fileName
 * @param response
 */
function downloadCSVFile({lines, fileName, response}) {
	if (!lines || !fileName || !response) {
		// do nothing
		return null;
	}

	if (!fileName.endsWith('.csv')) {
		fileName = fileName.concat('.csv');
	}
	const responseStr = lines.join('\n');
	const responseBuffer = encodeCSV(responseStr);

	// to avoid invalid character in header ['content-disposition']
	const contentDisposition = require('content-disposition');
	response.setHeader('Content-Disposition', contentDisposition(fileName));

	response.header('Content-Type', 'text/plain');
	response.end(responseBuffer);

	if (LOCAL) {
		console.log('\n' + fileName + ' created successfully \n');
	}
}


exports.isNull = isNull;
exports.sort = sort;
exports.numberFormat = numberFormat;
exports.priceFormatString = priceFormatString;
exports.toFrFormatStrWithComma = toFrFormatStrWithComma;
exports.toNumber = toNumber;
exports.toInt = toInt;
exports.toDecimal = toDecimal;
exports.toDate = toDate;
exports.toDateString = toDateString;
exports.toIndexDateString = toIndexDateString;
exports.toFrDateString = toFrDateString;
exports.toShortDateString = toShortDateString;
exports.toLongDateString = toLongDateString;
exports.toDateStringLogName = toDateStringLogName;
exports.toMoment = toMoment;
exports.getDayOfWeek = getDayOfWeek;
exports.getRestHeaders = getRestHeaders;
exports.parseGetString = parseGetString;
exports.getParseCallOptions = getParseCallOptions;
exports.parseFunction = parseFunction;
exports.onUser = onUser;
exports.fromBO = fromBO;
exports.isDirty = isDirty;
exports.isModified = isModified;
exports.getEMail = getEMail;
exports.serverLogin = serverLogin;
exports.restLogin = restLogin;
exports.getUserForSessionToken = getUserForSessionToken;
exports.getMongoCollection = getMongoCollection;
exports.aggregate = aggregate;
exports.update = update;
exports.shallowEquals = shallowEquals;
exports.capitalizeCase = capitalizeCase;
exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.getRelated = getRelated;
exports.fetchMany = fetchMany;
exports.indexParseObjects = indexParseObjects;
exports.decode64 = decode64;
exports.slugify = slugify;
exports.normalizeText = normalizeText;
exports.normalizeAddress = normalizeAddress;
exports.greaterThanIfExists = greaterThanIfExists;
exports.lessThanIfExists = lessThanIfExists;
exports.equalToIfExists = equalToIfExists;
exports.randomString = randomString;
exports.uppercase = uppercase;
exports.encodeCSV = encodeCSV;
exports.downloadCSVFile = downloadCSVFile;
exports.createComparisonQuery = createComparisonQuery;
exports.toFrDateTimeString = toFrDateTimeString;
exports.toTime = toTime;
