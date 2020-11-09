const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const recursive = require('recursive-readdir');

recursive(path.resolve(__dirname, 'invoices'), async function (err, files) {
	let counter = 0;
	for (let file of files) {
		counter += 1;
		const buffer = await fsPromises.readFile(file);
		const fileName = file.split('\\')[file.split('\\').length - 1];
		await fsPromises.writeFile(
			path.resolve(__dirname, 'flattened-invoices', fileName),
			buffer
		);
		console.log(counter);
	}
});
