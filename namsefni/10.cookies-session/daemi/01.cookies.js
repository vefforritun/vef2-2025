/*
Keyrt með:
node 01.cookies.js

Keyrir upp express vefjón sem setur kökur og birtir með mismunandi stillingum.

Notar `cookie-parser` pakkann til að undirrita kökur.
*/

import cookieParser from 'cookie-parser';
import express from 'express';

// ATH þetta dæmi virkar aðeins ef opnað á http://127.0.0.0.1:3000 í Chrome ekki á
// http://localhost:3000 því cookie er aðeins sett ef lén hefur amk einn punkt
const cookieHostname = '127.0.0.1';

// Þetta er lykillinn sem undirritar kökur
const cookieSecret = '2pijfA34Fs%ij3oS!f83j14';

const app = express();
app.use(cookieParser(cookieSecret));

app.get('/', (req, res) => {
  const { cookies, signedCookies } = req;

  console.log('Cookies', cookies, signedCookies);

  // Aðgengileg gegnum `document.cookie`
  // Mun valda warning í vafra, því SameSite er ekki sett
  res.cookie('session', 'hello world!', { httpOnly: false });

  // Ekki aðgengileg gegnum `document.cookie`
  res.cookie(
    'data',
    { date: new Date() },
    { domain: cookieHostname, httpOnly: true, sameSite: 'strict' },
  );

  // Kaka verður vistuð undirrituð og aðgengileg í `req.signedCookies`
  res.cookie('signed', 'top secret', {
    domain: cookieHostname,
    signed: true,
    sameSite: 'strict',
  });

  res.cookie('1min', 'expiring in one minute', {
    domain: cookieHostname,
    expires: new Date(Date.now() + 60000),
    sameSite: 'strict',
  });

  const yearInMs = 60 * 60 * 24 * 365 * 1000;

  res.cookie('1year', 'expiring in one year', {
    domain: cookieHostname,
    expires: new Date(Date.now() + yearInMs),
    sameSite: 'strict',
  });

  res.send(`
    <p>Cookies: ${JSON.stringify(cookies)}</p>
    <p>Signed cookies: ${JSON.stringify(signedCookies)}</p>
  `);
});

app.listen(3000, () => {
  console.info('Server running at http://127.0.0.1:3000/');
});
