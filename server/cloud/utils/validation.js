"use strict";

const Joi = require("joi");

const isValid = (parseObject, schema) => {
	let error;
	for (const propertyName in schema) {
		const schemaRule = schema[propertyName];
		const value = parseObject.get(propertyName);
		schemaRule.validate(value, (err, newValue) => {
			if (err) {
				const detail = err.details[0];
				error = "Error with the property '" + propertyName + "' and the value '" + detail.context.value + "' : " + detail.message;
				return;
			}
			if (value !== newValue) {
				parseObject.set(propertyName, newValue);
			}
		});
		if (error) {
			return error;
		}
	}
}

const checkValid = (parseObject, schema) => {
	const error = isValid(parseObject, schema);
	if (error) {
		throw new Error(error);
	}
}

/**
 * throws an Error
 * @param parseObject
 * @param name
 * @param required
 */
const checkPassword = (parseObject, name = 'password', required = true) => {
	const password = parseObject.get(name);
	const errorMessage = validatePassword(password, required);
	if (errorMessage) {
		throw new Error(errorMessage);
	}
}

/**
 *
 * @param password
 * @param required
 * @returns {String} the error message
 */
const validatePassword = (password, required = true) => {
	if (password == null) {
		if (required) {
			return 'Mot de passe obligatoire';
		}
	} else {
		if (password.length < 8) { // very simple, like the client's
			return 'Votre mot de passe doit faire au moins 8 caractères.';
		}
	}
	return undefined;
}

/**
 * checks a single value. Throws an error is the check fails.
 * @param value
 * @param schemaRule
 * @param propertyName just for the eventual error
 */
const checkValue = ({value, schemaRule, propertyName}) => {
	schemaRule.validate(value, schemaRule, err => {
		if (err) {
			const detail = err.details[0];
			throw new Error("Error with the property '" + propertyName + "' and the value '" + detail.context.value + "' : " + detail.message);
		}
	});
}

exports.isValid          = isValid;
exports.checkValid       = checkValid;
exports.checkValue       = checkValue;
exports.checkPassword    = checkPassword;
exports.validatePassword = validatePassword;
