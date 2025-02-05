/*
Keyrt með:
node env.js

Les upp úr `.env` gildi fyrir HOST og PORT, annars eru sjálfgefin gildi notuð.
*/

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

const app = express();

const {
  HOST: hostname = '127.0.0.1',
  PORT: port = 3000,
} = process.env;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
