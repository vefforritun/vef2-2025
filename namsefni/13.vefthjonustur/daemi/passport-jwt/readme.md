# Auðkenning með JWT

Til að keyra þarf að setja rétta slóð fyrir `DATABASE_URL` og `JWT_SECRET` í `.env` (sjá `.env.example`) í `.env` og keyra:

```bash
createdb users
<setja réttar upplýsingar í .env>
npm install
node createdb.js
node app.js
```

Í byrjun er einn notandi búinn til `admin` með lykilorð `123`. Aðrir notendur verða til í `users` töflu.

Til að auðkenna þarf að senda `POST` á `http://localhost:3000` með JSON sem inniheldur `username` og `password` fyrir notanda. Ef notandi og lykilorð eru rétt er `jwt token` skilað, annars koma villuskilaboð.

Eftir það er hægt að senda fyrirspurn á `/admin` með token í `Autherization` header sem `Bearer` token.

```bash
curl -H "Content-Type: application/json" -d '{"username": "admin", "password": "123"}' http://localhost:3000/login
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUxMjIxODA3LCJleHAiOjE1NTEyMjE4Mjd9.N3yIqdhejRKMyNb31rYWrZRVOg-DBew-0E2n1KHdF5o"}

curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ0ODc3MTUzLCJleHAiOjE2NDQ4NzcxNzN9.TLGzIVkjPtvBKJniNWz2C17X3loS4sE12VgeO5X39Os" http://localhost:3000/admin
{"data":"top secret"}

# Eftir að token er útrunnin
{"error":"expired token"}
```
