# Að setja upp og tengjast Postgres

Byrjum á að sækja postgres frá [postgresql.org](https://www.postgresql.org/download/). Eða gegnum `brew` á mac, eða viðeigandi pakkastjóra á linux.

Ef beðið er um notendaupplýsingar (notendanafn eða lykilorð) í uppsetningu, geymið á öruggum stað.

Þegar við höfum sett upp postgres á vélinni okkar gætum við lent í vandræðum við að tengjast. Helst er það tengt auðkenningu okkar við postgres. Tek það fram að ég (Óli) er engin sérfræðingur í notendaumsjón postgres gagnagrunna.

## Notendur í postgres

Í byrjun er einn notandi uppsettur, annað hvort með notendanafnið `postgres` eða nafn þess notanda sem skráður er inn (t.d. `osk`)

* Á windows er beðið um lykilorð fyrir `postgres` notanda í uppsetningu
* Á linux er `postgres` notandi til staðar en það er ekki hægt að tengjast með honum
* Á mac, ef postgres er sett upp með `brew install postgresql` heitir notandinn sama og innskráður notandi

Til þess að tengjast er hægt að nota `psql` CLI forrit:

```bash
# með sjálfgefnum notanda
> psl
# eða ákveðnum notanda
> psql -d postgres
# eða með username á database á 127.0.0.1
> psql <username> -h 127.0.0.1 -d <database>
# eða með username á database á localhost
> psql <username> -h localhost -d <database>
# eða með notanda og lykilorði
> psql -U <username> -W # og gefa upp lykilorð frá því við uppsetningu á Windows
```

Á Windows gæti verið að `psql` sé ekki í PATH, það er hægt að gera í gegnum `Settings > System`, [sjá svar á superuser.com](https://superuser.com/a/949577). Aftast í PATH þarf að setja slóð á `bin` möppu innan `postgres` möppu, t.d. `;C:\Program Files\PostgreSQL\10\bin`. Þá er hægt að keyra `psql` án þess að fá `'psql' is not recognized as an internal or external command` villu.

Eftir að komist er inn með `psql` er hægt að athuga hvaða notendur eru til staðar:

```bash
postgres=# \du
                                   List of roles
 Role name |                         Attributes                         | Member of
-----------+------------------------------------------------------------+-----------
 osk       | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
 ```

Þá getum við útbúið gagnagrunn (t.d. `v2`) og notanda (t.d. `notandi`) fyrir grunninn sem við vitum að hefur aðgang:

 ```bash
postgres=# CREATE USER notandi WITH ENCRYPTED PASSWORD 'mypass';
CREATE ROLE

postgres=# CREATE DATABASE db;
CREATE DATABASE

psql=# GRANT ALL PRIVILEGES ON DATABASE db TO notandi;
GRANT
```

Við getum þá hætt í psql og loggað okkur aftur inn sem nýr notandi, búið til töflu og bætt við hana:

```bash
psql=# \q
> psql -U notandi -d db

psql=# CREATE TABLE test (
  id serial primary key,
  text varchar(64) not null
);
CREATE TABLE

postgres=> INSERT INTO test (text) VALUES ('foo');
INSERT 0 1

postgres=> SELECT * FROM test;
 id | text
----+------
  1 | foo
(1 row)
```

Ef við tengjumst nú frá node þurfum við að byrja á útbúa möppu og sækja `pg` pakkann:

```bash
> cd postgres-test
> npm init -y
> npm install pg --save
```

Ef við búum nú til skrá `index.js`:

<!-- eslint-disable no-undef, import/no-unresolved  -->

```javascript
import pg from 'pg';

const connectionString = 'postgres://notandi2:mypass@localhost/db2';

// Búum til connection pool
const pool = new pg.Pool({ connectionString });

async function main() {
  // búum til client sem notar connection pool
  const client = await pool.connect();
  // framkvæmum select
  const result = await client.query('SELECT * FROM test;');
  // skoðum raðir sem koma til baka
  console.log(result.rows);
  // losum client aftur í pool
  await client.release();
  // lokum pool, fjarlægir af event loop og forrit hættir
  await pool.end();
}

main().catch((e) => console.error(e));
```

og keyrum:

```bash
> node index.js
[ anonymous { id: 1, text: 'foo' } ]
```

## Ekki að virka?

Í einhverjum tilfellum þarf að gefa notanda lykilorð eða setja gildistíma á notanda. Hægt er að gera þegar notandi er búinn til:

```bash
postgres=# CREATE USER foo WITH PASSWORD 'bar' VALID UNTIL 'infinity';
CREATE ROLE
```

eða breyta notanda sem nú þegar er til:

```bash
postgres=# ALTER USER notandi SET PASSWORD = 'bar';
ALTER ROLE

postgres=# ALTER USER notandi VALID UNTIL 'infinity';
ALTER ROLE
```

Ef notandi hefur lykilorð verður að breyta tengistreng t.d. í `'postgres://notandi:foo@localhost/v2'`.

## Ubuntu

[How to fix an error: password authentication failed for the user in PostgreSQL](https://hassanannajjar.medium.com/how-to-fix-error-password-authentication-failed-for-the-user-in-postgresql-896e1fd880dc).

---

Lentir þú í frekari vandræðum og fannst út úr þeim? Bættu veseni og lausn við með pull request eða láttu Óla vita á slack.
