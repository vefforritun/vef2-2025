/*
Keyrt með:
node 05.powered-by.js

Keyrir upp express þjón sem sjálfgefið „lekur“ því að hann sé keyrður af express
Gæti hjálpað árásaraðilum að finna vefjþóna til að gera árás á, ef upp kemur
almenn villa í Express.
*/

import express from 'express';

const app = express();

// Ekki leka að við séum að keyra express
app.set('x-powered-by', false);

app.get('/', (req, res) => {
  res.send('<p>Halló heimur</p>');
});

app.listen(3000, () => {
  console.info('Server running at http://localhost:3000/');
});
