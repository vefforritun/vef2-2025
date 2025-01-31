/*
Keyrt með:
node 02.session.js

Keyrir upp express vefjón sem notar session til að telja heimsóknir. Geymir
gögn í minni, svo allar upplýsingar þurrkast út þegar slökkt er á server.

Til að sjá virkni, opna vafra á slóð, endurhlaða og sjá talningu hækka. Athuga
að cookie gildi er aðeins sett fyrir session, í breytunni `counter.sid`.

Opna í öðrum vafra/private glugga og sjá að önnur gildi eru talin og cookie
fær annað gildi => annað session.

Notar `express-session` pakkann til að sjá um session.
*/

import express from 'express';
import session from 'express-session';

const sessionSecret = 'leyndarmál';

const app = express();
app.use(
  session({
    name: 'counter.sid',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      domain: '127.0.0.1',
      sameSite: 'strict',
    },
  }),
);

app.use((req, res, next) => {
  const { originalUrl } = req;

  if (!req.session.views) {
    req.session.views = {};
  }

  if (!req.session.views[originalUrl]) {
    req.session.views[originalUrl] = 0;
  }

  req.session.views[originalUrl] += 1;

  next();
});

function sessionCounter(req, res) {
  console.log('session', req.session);

  const { originalUrl } = req;
  const count = req.session.views[originalUrl];
  res.send(/* html */ `
    <p>Þú hefur opnað ${originalUrl} ${count} sinnum</p>
    <p><a href="/">Opna /</a></p>
    <p><a href="/foo">Opna /foo</a></p>
    <p><a href="/bar">Opna /bar</a></p>
  `);
}

app.get('/', sessionCounter);
app.get('/foo', sessionCounter);
app.get('/bar', sessionCounter);

app.listen(3000, () => {
  console.info('Server running at http://127.0.0.1:3000/');
});
