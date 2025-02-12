/*
Keyrt með:
node 08.csp.js

Notar `cal` skipun á mac/linux sem dæmi, hægt að breyta í annað, t.d. `dir` á
windows.

Getum skipt um ár með því að senda inn ár sem year querystring.. en ef við höfum
eins og er gefum við aðgang að öllu stýrikerfi, með því t.d. að senda inn
?year=2019 | ls
*/

import { exec } from 'child_process';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  // EKKI GERA SVONA! Getum injectað einhverju ljótu hér
  const year = req.query.year || new Date().getFullYear();
  const command = `cal ${year}`;

  exec(command, (err, data) => {
    if (err) console.error(err);

    return res.send(`
      <pre>${data}</pre>
      <a href="/?year=${Number.parseInt(year, 10) + 1}">Næsta ár</a>
    `);
  });
});

app.listen(3000, () => {
  console.info('Server running at http://localhost:3000/');
});
