/*
Keyrt með:
node 14.promisify.js

data.txt verður að vera til, annars grípur `catch`
villu , t.d.
{
  Error: ENOENT: no such file or directory, open 'data.txt'
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: 'data.txt'
}
Sama villa væri send í fyrsta argument ef við
værum að nota callback.

annars er Promise uppfyllt og gögn skrifuð út sem strengur:
Halló, heimur!
*/

const util = require('util');
const fs = require('fs');

// Frá og með node 8 er util.promisify til sem
// breytir callback API í promise
const readFileAsync = util.promisify(fs.readFile);

// Frá og með node 10 er til promise „hliðarpakki“
// sem við getum stótt
// const readFileAsync = require('fs').promises.readFile;

const p = readFileAsync('data.txt')
  .then((data) => {
    console.log(data.toString('utf8'));
  })
  .catch((err) => {
    console.error(err);
  });
console.log(p);
