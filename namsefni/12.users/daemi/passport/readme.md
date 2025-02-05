# Notendaumsjón með skráningu

Til að keyra þarf að setja rétta slóð fyrir `DATABASE_URL` og `SESSION_SECRET` í `.env` (sjá `.env.example`) og keyra:

```bash
createdb users
# <setja réttar upplýsingar í .env>
npm install
node createdb.js
node app.js
```

Í byrjun er einn notandi búinn til `admin` með lykilorð `123`. Aðrir notendur verða til í `users` töflu.
