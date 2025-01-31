/*
Keyrt með:
node 08.data.js

Keyrir upp express vefþjón á http://localhost:3000 sem bíður upp á að fylla út
form með nafni, netfangi og kennitölu.
App notar express urlencoded middleware til að vinna úr gögnum.

Notar sérsmíðaðann kóða til að validate'a gögn úr formi og birta villur ef gögn
líta ekki rétt út. Verðum að gera þrátt fyrir að HTML input hafi required, email
type eða pattern, auðveldlega hægt að slökkva á því í vafra.

Almennt viljum við *ekki* sérsmíða svona kóða, heldur nota traust forritasöfn.
Þau tryggja okkur ekki 100% gegn villum, en eru töluvert nær því en ef við
skrifum sjálf.
*/

import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));

function template(name = '', email = '', ssn = '') {
  return /* html */ `
    <form method="post" action="/post">
      <label>
        Nafn:
        <input required type="text" name="name" value="${name}">
      </label>
      <label>
        Netfang:
        <input required type="email" name="email" value="${email}">
      </label>
      <label>
        Kennitala:
        <input
          required
          type="text"
          pattern="^[0-9]{6}-?[0-9]{4}$"
          name="ssn"
          value="${ssn}"
        >
      </label>
      <button>Senda</button>
    </form>
  `;
}

app.get('/', (req, res) => {
  res.send(template());
});

app.post('/post', (req, res) => {
  const { name = '', email = '', ssn = '' } = req.body;

  const errors = [];

  if (name === '') {
    errors.push('Nafn má ekki vera tómt');
  }

  if (email === '' || email.indexOf('@') < 0) {
    errors.push('Netfang má ekki vera tómt og verður að innihalda @');
  }

  if (ssn === '' || !/^[0-9]{6}-?[0-9]{4}$/.test(ssn)) {
    errors.push('Kennitala má ekki vera tóm og verður að vera tíu tölustafir');
  }

  if (errors.length > 0) {
    return res.send(`${template(name, email, ssn)}
    <p>Villur:</p>
    <ul>
      <li>${errors.join('</li><li>')}</li>
    </ul>`);
  }

  const data = {
    name,
    email,
    ssn,
  };

  res.send(`<p>Skráning móttekin</p><p>${JSON.stringify(data)}</p>`);
});

app.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000/');
});
