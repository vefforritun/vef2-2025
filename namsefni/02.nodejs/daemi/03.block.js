/*
Keyrt með:
node 03.block.js

setTimeout keyrir ekki eftir 1s eins og við skilgreinum,
heldur eftir að ítrun hefur keyrt í 3s OG forrit klárað
keyrslu
*/

const d = new Date();
console.log(`Forrit byrjar: ${d.toString()}`);

setTimeout(() => {
  console.log(`Time out keyrir: ${new Date().toString()}`);
}, 100);

let i = 0;
const iterateUntil = d.getTime() + 3000;
while (new Date().getTime() < iterateUntil) {
  i += 1; // blokkar í um 3s
}
console.log(`${i} ítranir í um 3 sek`);

console.log(`Seinasta lína forrits: ${new Date().toString()}`);
