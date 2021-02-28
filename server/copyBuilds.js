const fs = require('fs-extra');
const wait = require('util').promisify(setTimeout);

const run = async () => {
	//---- build ----//
	console.log('copying bo build');
	await fs.remove('./build');
	await wait(1000);
	await fs.ensureDir('./build');
	await fs.copy('../web/build', './build');

	console.log('done');
}

run();