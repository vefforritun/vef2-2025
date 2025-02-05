/*
Keyrt með:
node express-rest.js

Keyrir upp express vefþjón sem leyfir að eiga við gögn með
`GET`, `POST`, `PUT`, `PATCH` og `DELETE`.

Geymir gögn í minni, aðeins fyrir dæmi. Í alvöru væri einhver gagnagrunnur í
notkun til að geyma gögn.

Þar sem þetta er dæmi er validation og staðfesting á gögnum ekki nógu góð.

Öll dæmi nota cURL.
*/
import express from 'express';

const app = express();
app.use(express.json());

const data = [
  { id: 1, title: 'Foo', name: 'Jón' },
  { id: 2, title: 'Bar', name: 'Anna' },
];

// hjálparfall sem athuga hvort "s" sé null, undefined eða falsy
function isEmpty(s) {
  return s == null && !s;
}

// Útbýr ID fyrir færslu, aðeins fyrir dæmi, ekki nota í neinu alvöru!
// Ef við höfum gagnagrunn myndum við nota serial primary key þar til að
// útbúa ID
function nextId() {
  return data.map((i) => i.id).reduce((a, b) => (a > b ? a : b + 1), 1);
}

/*
GET:
> curl http://localhost:3000
[{"id":1,"title":"Foo"},{"id":2,"title":"Bar"}]

> curl http://localhost:3000/2
{"id":2,"title":"Bar"}
*/
app.get('/', (req, res) => {
  res.json(data);
});

app.get('/:id', (req, res) => {
  const { id } = req.params;

  const item = data.find((i) => i.id === Number.parseInt(id, 10));

  if (item) {
    return res.json(item);
  }

  return res.status(404).json({ error: 'Not found' });
});

/*
POST:
> curl -vH "Content-Type: application/json" -d '{x}' http://localhost:3000/
{"error":"Invalid json"}

> curl -vH "Content-Type: application/json" -d '{"title":""}' http://localhost:3000/
{"field":"title","error":"Title must be a non-empty string"}

> curl -vH "Content-Type: application/json" -d '{"title":"bar"}' http://localhost:3000/
{"id":2,"title":"foo"}
*/
app.post('/', (req, res) => {
  const { title = '' } = req.body;

  // Hér ætti að vera meira robust validation
  if (typeof title !== 'string' || title.length === 0) {
    return res.status(400).json({
      field: 'title',
      error: 'Title must be a non-empty string',
    });
  }

  const item = { id: nextId(), title, name: '' };
  data.push(item);

  return res.status(201).json(item);
});

/*
PUT:
> curl -X PUT -H "Content-Type: application/json" -d '{"title": "asdf", "name": "Jói"}' http://localhost:3000/4
{"error":"Not found"}

> curl -X PUT -H "Content-Type: application/json" -d '{"title": "asdf", "name": "Jói"}' http://localhost:3000/2
{"id":2,"title": "asdf","name": "Jói"}
*/
app.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title = '', name = '' } = req.body;

  const item = data.find((i) => i.id === Number.parseInt(id, 10));

  if (!item) {
    return res.status(404).json({ error: 'Not found' });
  }

  const errors = [];

  // Hér ætti að vera meira robust validation
  if (typeof title !== 'string' || title.length === 0) {
    errors.push({
      field: 'title',
      error: 'Title must be a non-empty string',
    });
  }

  if (typeof name !== 'string' || name.length === 0) {
    errors.push({
      field: 'name',
      error: 'Name must be a non-empty string',
    });
  }

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  item.title = title;
  item.name = name;
  return res.status(200).json(item);
});

/*
PATCH:
> curl -X PATCH -H "Content-Type: application/json" -d '{"title": "asdf"}' http://localhost:3000/4
{"error":"Not found"}

> curl -X PATCH -H "Content-Type: application/json" -d '{"title": "asdf"}' http://localhost:3000/2
{"id":2,"title": "asdf","name": "Anna"}
*/
app.patch('/:id', (req, res) => {
  const { id } = req.params;

  // verðum að vita hvort gögnin séu send inn eða aðeins falsy
  const { title, name } = req.body;

  const item = data.find((i) => i.id === Number.parseInt(id, 10));

  if (!item) {
    return res.status(404).json({ error: 'Not found' });
  }

  const errors = [];

  // Þetta gæti valdið vandræðum ef title mætti vera uppfært sem tómi strengur
  if (!isEmpty(title)) {
    if (typeof title !== 'string' || title.length === 0) {
      errors.push({
        field: 'title',
        error: 'Title must be a non-empty string',
      });
    }
  }

  if (!isEmpty(name)) {
    if (typeof name !== 'string' || name.length === 0) {
      errors.push({
        field: 'name',
        error: 'Name must be a non-empty string',
      });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  if (!isEmpty(title)) {
    item.title = title;
  }

  if (!isEmpty(name)) {
    item.name = name;
  }

  return res.status(200).json(item);
});

/*
DELETE:
> curl -X DELETE http://localhost:3000/5
{"error":"Not found"}

> curl -X DELETE http://localhost:3000/2
*/
app.delete('/:id', (req, res) => {
  const { id } = req.params;

  const item = data.find((i) => i.id === Number.parseInt(id, 10));

  if (item) {
    data.splice(data.indexOf(item), 1);
    return res.status(204).end();
  }

  return res.status(404).json({ error: 'Not found' });
});

app.use((req, res) => {
  console.warn('Not found', req.originalUrl);
  res.status(404).json({ error: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Grípum illa formað JSON og sendum 400 villu til notanda
  if ('status' in err && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid json' });
  }

  console.error(err);
  return res.status(500).json({ error: 'Internal server error' });
});

app.listen(3000, () => {
  console.info('Server running at http://localhost:3000/');
});
