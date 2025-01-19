/*
Keyrt með:
node 16.async-await-gotcha.js

*/
const util = require('util');
const fs = require('fs/promises');

// stat gefur okkur upplýsingar um skrá eða möppu
const statAsync = util.promisify(fs.stat);

const FILE = './datad.txt';

async function exists(file) {
  try {
    const stats = await statAsync(file);
    return stats.isFile();
  } catch (e) {
    // ekki til, loggum ekki
  }
  return false;
}

async function main() {
  let data = '';

  // Viljum athuga hvort skráin sé til áður en
  // við lesum... en gleymum await!
  // Promise eru truthy svo þetta mun virka þangað
  // til við reynum að lesa skrá sem er ekki til
  if (await exists(FILE)) {
    data = await fs.readFile(FILE);
  } else {
    console.warn(`Skrá "${FILE}" er ekki til`);
  }

  console.log(data.toString('utf8'));
}

main().catch((err) => { console.error('Villa!', err); });
