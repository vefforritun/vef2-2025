/*
Keyrt með:
node 12.set-num-file-fixed.js

Bætum 'fs' (filesystem) pakkanum við forritið okkar
og bindum vísun við breytuna fs

num breyta er skilgreind með let sem gerir hana
_blocked scope_, set() hefur aðgang að breytu.

set() er fall sem tekur við callback argumenti og
les úr num.txt gildi og kallar síðan í callback
með niðurstöðu.

Sendum callback inn í set fall sem loggar út breytu,
það keyrir _eftir_ að niðurstaða úr því að lesa
skjalið er komin og við fáum því rétt gildi út.

*/

const fs = require('fs');

let num;

function set(callback) {
  fs.readFile('num.txt', 'utf8', (err, data) => {
    num = Number.parseInt(data, 10);
    callback(num);
  });
}

set((n) => {
  console.log(n);
});
