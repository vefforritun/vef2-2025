# Síður og Postgres

Sett upp með því að útbúa gagnagrunn, setja gögn í `.env` og keyra `createdb.js`.

`createdb.js` útbýr 10.000 færslur í gagnagrunni með [faker](https://github.com/faker-js/faker)

```bash
npm install
createdb mock
cp .env.example # eða afrita á annan hátt
node createdb.js
node app.js
```

GET a `/` sýnir tíu færlur í gagnagrunni í einu, ásamt slóðum á sjálfa síðuna, fyrri og næstu síður, ef einhverjar.
