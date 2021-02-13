'use strict';

const Log = Parse.Object.extend('Log');

/**
 * log on new user subscribe
 * @param {*} user 
 */
async function subscriptionEvent(user) {
	const subscription = createLogValues({
		data: { user, description: "a crée son compte" }
	});
  await saveEventLog(subscription);
}
/**
 * log  user change password
 * @param {*} user 
 */
async function changePasswordLog(user) {
	const subscription = createLogValues({
		data: { user, description: 'a réinitialisé son mot de passe' },
		action: 'update'
	});
  await saveEventLog(subscription);
}

/**
 * set log values
 * @param {Object} data (it contains { user, manager, ...otherProps } )
 * @param {string} type (it can be 'user' or 'plan', 'shipping', 'order', 'opinion',...
 * @param {string} action (it can be 'add', 'update', 'delete',...
 * @param {string} [description]
 * @returns {* | Object}
 */
function createLogValues({ data, type = 'user', action = 'add', description } = {}) {
	if (!data) return null;

	const logValues = {
		type,	action,
		...data
	};

	if (data.user) {
		logValues.user = data.user;
	}

	//-- manager --//
	const manager = data.manager;
	if (manager && manager.className === '_User') {
		logValues.manager = manager;
	}

	//-- description --//
	if (!logValues.description && description) {
		logValues.description = description;
	}

	return logValues;
}

/**
 * create new Log from values
 * @param {Object} values
 */
async function saveEventLog(values) {
	if (!values || typeof values !== 'object') return null;
  const eventLog = new Log();
  for (const key in values) {
    const value = values[key];
    if (!value) {
      continue;
    }
    eventLog.set(key, value);
  } 
  await eventLog.save(null, USE_MASTER_KEY);
}

exports.subscriptionEvent = subscriptionEvent;
exports.changePasswordLog = changePasswordLog;
exports.saveEventLog = saveEventLog;