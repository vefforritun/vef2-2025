---
title: Node atburðir & straumar
---

## Node atburðir & straumar

### Vefforritun

### Ólafur Sverrir Kjartansson, [osk@hi.is](mailto:osk@hi.is)

---

## Atburðir & straumar

* Kíkjum aðeins undir húddið
* Skoðum hvernig „low level“ meðhöndlun á þessu sem við höfum verið að gera fer fram

***

## EventEmitters

* Margt í Node.js er byggt á [_atburðum_](https://nodejs.org/api/events.html)
  * Eitthvað gerist og við bregðumst við því
* Allir hlutir í Node.js sem gefa frá sér atburði eru _EventEmitters_
* Skráum okkar meðhöndlun á atburði með `on()` falli
  * Svipar til `addEventListener` í vafra

***

```javascript
import EventEmitter from 'events';

const emitter = new EventEmitter();
emitter.on('some-event', () => {
  console.log('omg event!');
});
```

***

* Getum útbúið okkar eigin EventEmitter með því að extenda `EventEmitter`
* Erum samt mun oftar að nota event emittera frá öðrum en að skrifa okkar eigin

***

<!-- eslint-disable no-undef, no-unused-vars, lines-between-class-members -->

```javascript
class Pulse extends EventEmitter {
  pulse() {
    this.emit('pulse');
  }
  start(n) {
    this.id = setInterval(
      () => this.pulse(),
      n,
    );
  }
  stop() {
    clearInterval(this.id);
  }
}
```

***

## Dæmi

* [eventemitter.js](./daemi/events-streams/01.eventemitter.js)

---

## Straumar

* Straumar ([streams](https://nodejs.org/api/stream.html)) eru _abstract interface_ sem við notum til að eiga við _streymandi_ gögn í Node.js
* Margir mismunandi straumer í boði, við lestur og skrif á skrám, HTTP server, `process.stdout` o.fl.
* Straumar geta verið lesanlegir, skrifanlegir eða bæði (duplex)

***

* Straumar veita okkur aðgang að gögnum hraðar en að þurfa að bíða eftir öllu
  * Lesum ekki alla skránna í minni áður en við getum byrjað að vinna með hana
* Strauma útfærslur nota _buffers_
  * Sækjum ákveðið mikið í einu, vinnum með það, sækjum næsta part o.s.fr.

***

* Skiptir ekki máli fyrir minni skrár sem við lesum af disk
  * En ef við reynum að lesa inn skrá sem er fleiri GB lendum við í vandræðum
* Fáum betri upplifun þegar við lesum skrár yfir net
  * Ef við erum að horfa á vídeó værum við ekki kát að þurfa að bíða eftir að það væri allt sótt

***

* Ef straumur er skrifanlegur höfum við aðferðir til að skrifa í strauminn
  * Skrifum í buffer sem síðan er streymt í strauminn
* Getum notað til að skrifa í skjöl, nettengingar o.fl.
* Getum pípað saman strauma til að lesa úr einum beint í annan
  * `stream.pipe(another);`

***

```javascript
import fs from 'fs';

const stream = fs.createWriteStream('huge.txt');

for (let i = 0; i < 6e6; i++) {
  stream.write('halló heimur ');
}
```

***

```javascript
import fs from 'fs';

const read = fs.createReadStream('huge.txt');

read.on('data', (chunk) => {
  console.log('chunk', chunk);
});

read.on('close', () => {
  console.log('file read');
});
```

***

## Strauma dæmi

* [write-stream.js](./daemi/events-streams/02.write-stream.js)
* [read-stream.js](./daemi/events-streams/03.read-stream.js)

---

## TCP

* Við getum notað [`net`](https://nodejs.org/api/net.html) kjarnaeininguna til þess að útbúa TCP strauma
* Of low-level fyrir okkur en gott að vita af

```javascript
import net from 'net';

const server = net.createServer();
server.on('connection', () => {
  /* ... */
});
```

---

## HTTP

* Nær okkur er [`http`](https://nodejs.org/api/http.html) einingin sem leyfir okkur að búa til HTTP þjón
* Yfirgripsmikill stuðningur við HTTP og styður strauma í samskiptum
* [Anatomy of an HTTP Transaction](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)

***

```javascript
import http from 'http';

const server = http.createServer();

server.on('request', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

const port = 3000;

server.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
```

***

## request

* `request` (oft `req`) er lesanlegur straumur sem gefur okkur aðgang að upplýsingum um HTTP request frá client
  * t.d. `method`, `url` og `headers`
* Gögn sem eru send, t.d. ef við erum að nota `POST`, þurfum við að lesa úr straum
  * `request.on('data', (chunk) => { /* ... */ });`

***

## response

* `response` (oft `res`) er skrifanlegur straumur sem sendur verður client, getum átt við upplýsingar
  * `response.statusCode = 404;`
  * `response.setHeader('Foo', 'Bar');`
  * `response.write('<html lang="is">');`
* Verðum alltaf að eiga við status kóða og headers **áður** en við skrifum í svarið!

***

## Okkar eigin vefþjónn

* Getum notað `request.method` og `request.url` til að útfæra einfaldan vefþjón
  * Lesum CSS og HTML skrár af disk ef við eigum
  * Svörum ákveðnum slóðum með _dýnamísku_ efni
  * Annars `404`
* [daemi/events-streams/simple-server/server.js](server.js)

***

## `http` og Express

* Express nýtir http eininguna, veitir okkur aðgang að sömu föllum, propertieum
* Bætir við aukaleg því sem þarf til að notkun verði þægilegri

***

## HTTP dæmi

* [http.js](./daemi/events-streams/05.http.js)
* [http-request.js](./daemi/events-streams/06.http-request.js)
* [http-read-file.js](./daemi/events-streams/07.http-read-file.js)
* [http-read-stream.js](./daemi/events-streams/08.http-read-stream.js)
