# Express

- [Express](1.express.md), [vídeó (04:49)](https://youtu.be/xyJ-ARZvATg)
- [Express server](2.server.md), [vídeó (08:48)](https://youtu.be/IZOBeutQaYQ)
- [Express — request og response](3.request-response.md), [vídeó (05:31)](https://youtu.be/bunpv-3iNxo)
- [Middleware](4.middleware.md), [vídeó (08:43)](https://youtu.be/-VMR9NQDzFA)
- [Routing](5.routing.md), [vídeó (07:25)](https://youtu.be/nlT319ASU2o)
- [Express og HTTP](6.http.md), [vídeó (02:39)](https://youtu.be/zHI8QWaOckI)
- [Templates](7.templates.md), [vídeó (07:00)](https://youtu.be/-0QYovKGmMM)
- [Express og villumeðhöndlun](8.villur.md), [vídeó (07:22)](https://youtu.be/ZjXrsjYX5aI)

Í dag hefur Express ekki hlotið neina meiriháttar uppfærslur í nokkurn tíma, en það er ennþá vinsælt og mörg önnur forrit nýta Express.

## Dæmi

### HTTP dæmi

- [http-methods.js](daemi/http/01.http-methods.js)
- [content-type.js](daemi/http/02.content-type.js)
- [download.js](daemi/http/03.download.js)
- [compression.js](daemi/http/04.compression.js)
- [url.js](daemi/http/05.url.js)

### Express dæmi

- [hello-world.js](daemi/01.hello-world.js)
- [request.js](daemi/02.request.js)
- [response.js](daemi/03.response.js)
- [subapp.js](daemi/04.subapp.js)
- [router-app.js](daemi/05.router-app.js)
- [router.js](daemi/05.router.js)
- [middleware.js](daemi/06.middleware.js)
- [error-handling.js](daemi/07.error-handling.js)
- [static.js](daemi/08.static.js)
- [template-ejs.js](daemi/09.template-ejs.js)
- [async-await.js](daemi/10.async-await.js)

## Hono

Annað framework sem hægt er að nota er [`Hono`](https://hono.dev/), svipaðar hugmyndir (t.d. middleware, routing) en byggir á HTTP stöðlum, sér í lagi fyrir [request](https://developer.mozilla.org/en-US/docs/Web/API/Request) og [response](https://developer.mozilla.org/en-US/docs/Web/API/Response). Kostur við að byggja á stöðlum er að hægt er að setja forrit byggð með Hono upp á ýmsum stöðum sem nýta staðlaða request/response hluti en ekki Node.js `http` hluti.

[Hono dæmi](https://github.com/honojs/examples).

## Aukaefni

- [Express: Fast, unopinionated, minimalist web framework for Node.js](https://expressjs.com/)
- [Express skjölun](https://expressjs.com/en/4x/api.html)
- [Express middleware listi](http://expressjs.com/en/resources/middleware.html)
- [Connect middleware listi](https://github.com/senchalabs/connect#middleware)
