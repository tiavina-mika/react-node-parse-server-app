const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const password = 'fcencryption18';

function encrypt(text){
	const cipher = crypto.createCipher(algorithm, password);
	let crypted = cipher.update(text, 'utf8', 'base64');
	crypted += cipher.final('base64');
	return crypted;
}

function decrypt(text){
	const decipher = crypto.createDecipher(algorithm, password);
	let decrypted = decipher.update(text, 'base64', 'utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;