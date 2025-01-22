/*
Keyrt með:
node 10.async-await.js

Keyrir upp vef með express:

`readFile` les skrá en skilar villu ef skrá er ekki til.

- `/` skrifar út villu ef readFile skilar villu, annars skrifar út innihald
  skráar sem vísað er í
- `/unsafe` krassar út villu ef readFile skilar villu, annars skrifar út
  innihald skráar sem vísað er í

*/

import { readFile } from 'fs/promises';
import express from 'express';

const app = express();

async function read(req, res) {
  // Breyta má þessari villu til að fá fram villu í readFile
  const data = await readFile('./10.async-awaitx.js');

  // Ef við köstum þessari villu og pössum ekki upp á að grípa mun
  // forritið okkar krassa. Á við um allar villur utan try catch í
  // async middleware!
  // throw new Error('boo');

  return res.type('txt').send(data);
}

/**
 * Wrap an async function with error handling
 */
function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

// Grípum villur og erum örugg
app.get('/', catchErrors(read));

// Ónei! Villur munu krassa forritinu okkar
app.get('/unsafe', read);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
