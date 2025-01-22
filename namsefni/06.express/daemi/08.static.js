/*
Keyrt með:
node 08.static.js

Nota express.static() middleware til að gera skrár úr /public aðgengileg. Getum skoðað:
http://127.0.0.1:3000/style.css
*/
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';

const app = express();

// Ef við værum að nota CommonJS væri línan svona, nýtti
// __dirname galdrabreytu
// app.use(express.static(path.join(__dirname, 'public')));

// Fyrra dæmi nýtti
// new URL('./public', import.meta.url).pathname)
// en það virkar ekki sem skildi á windows, því þar verður slóðin
// file:///C:/.../slóð/á/skrá og "new URL()" mun aðeins fjarlægja "file://"
// svo við höfum "/C:/.../slóð/á/skrá" sem er ólöglegt útaf þessu fyrsta "/"

// fileURLToPath skilar okkur fullri slóð á nákvæmlega þessa skrá, t.d.
// C:/.../slóð/á/08.static.js
// dirname fjarlægir skráarheitið og skilar okkur bara möppu
// C:/.../slóð/á/
// Sjá nánar um þetta á
// https://github.com/nodejs/node/issues/28114
const path = dirname(fileURLToPath(import.meta.url));

// join setur saman þessar tvær slóðir rétt m.v. hvaða stýrikerfi við erum á
// C:/.../slóð/á/public
app.use('/static', express.static(join(path, './public')));

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
