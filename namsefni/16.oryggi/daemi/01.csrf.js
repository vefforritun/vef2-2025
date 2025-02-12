/*
Keyrt með:
node 01.csrf.js

Keyrir upp express þjón með formi á /
Þetta form hefur uppsetta csrf vörn gegnum csurf pakkann. Formið er ekki gilt
nema að það innihaldi gildi _csrf sem kemur frá middlewareinu gegnum
`req.csrfToken()`.

Þarf að nota `cookie-parser` til að fá aðgang að cookies.

Ef við keyrum form gegnum vafra verður _csrf gildi sent í gegnum falið input.
Ef við reynum að keyra án þessa gildis, t.d. með cURL:

curl -d "data=123" -X POST http://localhost:3000/process

fáum við upp villu þar sem csrf gildið vantar.
*/

import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import express from 'express';

const csrfProtection = csrf({ cookie: true });

const app = express();

app.use(express.urlencoded({ extended: true }));

// Parseum cookies, CSRF gildið er tengt því sem er vistað í cookie
app.use(cookieParser());

app.get('/', csrfProtection, (req, res) => {
  const csrfToken = req.csrfToken();
  console.log(req.cookies, csrfToken);

  res.send(`
<form method="post" action="/process">
  <input type="hidden" name="_csrf" value="${csrfToken}">
  <input type="text" name="data">
  <button>Senda</button>
</form>`);
});

app.post('/process', csrfProtection, (req, res) => {
  res.send('data is being processed');
});

app.listen(3000, () => {
  console.info('Server running at http://localhost:3000/');
});
