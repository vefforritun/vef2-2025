/*
Keyrt með:
node 11.set-num-file-broken.js

Bætum 'fs' (filesystem) pakkanum við forritið okkar
og bindum vísun við breytuna fs

num breyta er skilgreind með let sem gerir hana
_blocked scope_, set() hefur aðgang að breytu.

set() er fall sem les úr num.txt gildi og setur í
num breytuna.

loggum út num breytu eftir kall, fáum undefined því
lestur úr skjalinu er ósamstillt (async) aðgerð
sem fer á event loopu og skilast _eftir_ að við
loggum út.

*/

const fs = require('fs');

let num;

function set() {
  // number.txt inniheldur "1"
  fs.readFile('./num.txt', (err, data) => {
    num = Number.parseInt(data, 10);
  });
}

set();

console.log(num);
