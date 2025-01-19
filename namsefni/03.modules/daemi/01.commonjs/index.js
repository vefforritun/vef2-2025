// Exportað úr index.js, sjálfgefin hegðun
const a = require('./module-a');

// Exportað úr index.js sem síðan sækir úr `./file.js` sem nýtir relative slóðir
const b = require('./module-b');

// Exportað úr `app.js` sem er skilgreint sem „main“ með lykli í package.json
const c = require('./module-c');

// Sækjum úr `./file.js` án þess að fara gegnum b
const file = require('./file');

// Sækjum JSON gögn beint, án þess að nota JSON.parse
const json = require('./json.json');

// Venjan er að hafa öll require/import efst í skjali og síðan kóða fyrir neðan

// Sjáum object sem exportað er og köllum í
console.log(a);
console.log(a.add(1, 2));

// Ónefnt fall sem exportað er úr `./file.js`
console.log(b);

// Fall úr `./file.js`, köllum í og fáum gögn
console.log(file());

// Strengur úr `./module-c/app.js`
console.log(c);

// JSON gögn úr `./json.json`
console.log(json);
