/*
Keyrt með:
node 01.hello-world.js
eða
npm run dev
sem keyrir nodemon sem hlustar á breytingar og endurhleður fyrir okkur
síðan opna vafra á
http://127.0.0.1:3000

Keyrir upp einfaldan express þjón sem svarar á / og /bye
Þar sem "Hello World!" er ekki með skilgreint path mun það svara fyrir öll
request ef það er á undan /bye og /bye mun aldrei keyra.
Sjáum í seinni dæmum hvernig við getum komist hjá því.
*/

import express from 'express';

const app = express();

// 127.0.0.1 er það sama og localhost, vélin sem er að
// keyra forritið
const hostname = '127.0.0.1';

// Verðum að velja port sem er >1024, annars er það
// frátekið fyrir stýrikerfið
const port = 3001;

app.use('/bye', (req, res) => {
  res.send('Bye!');
});

app.use((req, res) => {
  console.info('Heimsókn!');
  res.send('Hello World! Halló halló');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
