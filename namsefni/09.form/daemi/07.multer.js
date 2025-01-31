/*
Keyrt með:
node 07.multer.js

Keyrir upp express vefþjón á http://localhost:3000 sem bíður upp á að fylla út
form með einni skrá sem POSTað er á /single eða tvær skrár sem POSTað er á /many
App notar multer middleware til að vinna úr gögnum og ná í innihald þeirra.
Birtir skráarnafn, MIME type og innihald stöku skrár
Birtir lista af skráarnöfnum og MIME types fyrir tvær skrár
*/
import express from 'express';
import multer from 'multer';

const upload = multer();

const app = express();

app.get('/', (req, res) => {
  res.send(/* html */ `
    <h2>Stök skrá</h2>
    <form method="post" action="/single" enctype="multipart/form-data">
      <input type="file" name="data">
      <button>Senda</button>
    </form>

    <h2>Fylki af skrám</h2>
    <form method="post" action="/many" enctype="multipart/form-data">
      <input type="file" name="data">
      <input type="file" name="data">
      <button>Senda</button>
    </form>
  `);
});

app.post('/single', upload.single('data'), (req, res) => {
  const {
    originalname: filename = '',
    mimetype = '',
    buffer = null,
  } = req.file ?? {};

  const content = buffer?.toString('utf8');
  const result = `${filename} er ${mimetype}, inniheldur ${content}`;
  res.send(result);
});

app.post('/many', upload.array('data'), (req, res) => {
  const files = Array.isArray(req.files) ? req.files : [];

  const names = files.map((i) => i.originalname).join(', ');
  const mimetypes = files.map((i) => i.mimetype).join(', ');

  const result = `${files.length} skrár
skráarnöfn: ${names},
týpur: ${mimetypes}`;
  res.send(result);
});

app.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000/');
});
