/*
Keyrt með:
node 13.promise.js
*/

function futureMessage(msg) {
  return new Promise((resolve, reject) => {
    if (msg === 'foo') reject(new Error('nope'));

    setTimeout(
      () => resolve(`${msg} from future!`),
      2000,
    );
  });
}

futureMessage('foo')
  .catch((s) => console.log(s.message));
// "nope" strax ásamt villuskilaboðum (ekki stacktrace)

futureMessage('Hi!')
  .then((s) => console.log(s))
  .catch((s) => console.log(s.message));
// "Hi! from future!" eftir 2 sek
// Hér mun catch aldrei grípa neitt þar sem við
// höfum fast inntak, en ættum _alltaf_ að skilgreina
// hvað gerist við villu
