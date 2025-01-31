/*
Keyrt með:
node 04.post-form.js

Keyrir upp express vefþjón á http://localhost:3000 sem bíður upp á að fylla út
form með texta og skrá sem sent er með multipart/form-data á /post
App notar straum til að lesa úr request
BIrtir gögn ásamt öllu efni úr skrá með boundaries.
*/
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send(/* html */ `
    <form method="post" action="/post" enctype="multipart/form-data">
      <input type="text" name="data">
      <input type="file" name="file">
      <button>Senda</button>
    </form>
  `);
});

app.use((req, res, next) => {
  // ATH almennt notum við ekki þessa aðferð,
  // heldur body-parser middleware, eða í þessu
  // tilfelli, middleware sem höndlar skrár

  // Nú sendist allt skjalið, en þetta er ekki nægilega góð
  // lausn til að geta unnið með það á einhvern góðan máta
  const chunks = [];
  req.on('data', (chunk) => chunks.push(chunk));
  req.on('end', () => {
    req.body = chunks.join();
    next();
  });
});

app.post('/post', (req, res) => {
  // Ef við veljum skrá sem inniheldur binary gögn (t.d. mynd)
  // verður svarið allt í klessu
  res.send(`POST gögn: ${req.body}`);
});

app.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000/');
});
