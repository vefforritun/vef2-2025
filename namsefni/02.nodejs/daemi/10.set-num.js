/*
Keyrt með:
node 10.set-num.js

num breyta er skilgreind með let sem gerir hana
_blocked scope_, set() hefur aðgang að breytu og
setur hana sem 1
loggum út num breytu eftir kall, fáum 1
*/

let num;

function set() {
  num = 1;
}

set();
console.log(num);
