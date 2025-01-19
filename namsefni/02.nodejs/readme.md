# node.js

Yfirferð á [node.js](https://nodejs.org/)

* [Kynning](1.nodejs.md), [vídeó (10:51)](https://youtu.be/kyEApq_f0QU)
* [Atburðir](2.events.md), [vídeó (07:53)](https://youtu.be/2WfOYzjl7es)
* [APIs](3.apis.md), [vídeó (06:41)](https://youtu.be/ePPZ73RI4l8)
* [Filesystem](4.fs.md), [vídeó (08:59)](https://youtu.be/MNyMhSircW4)
* [Promises](5.promises.md), [vídeó (09:11)](https://youtu.be/nK3FoyxdzfA)

Dæmi og fyrirlestrar nota Node.js 16 en í dag ætti að nota útgáfu 22.

Dæmi hér nota CommonJS modules en öllur önnur dæmi nota ECMAScript modules. Í dag ætti að nota ECMAScript modules nema eitthvað sérstakt krefjist að svo sé ekki.

Í dag ætti nær eingöngu að nota `fs/promises` en dæmi hér nota `fs` og `util.promisify`.

## Dæmi

* [log.js](daemi/04.log.js)
* Atburðir
  * [hello-world.js](daemi/01.hello-world.js)
  * [interval.js](daemi/02.interval.js)
  * [block.js](daemi/03.block.js)
* APIs
  * [args.js](daemi/05.args.js)
  * [hrtime.js](daemi/06.hrtime.js)
  * [buffer.js](daemi/07.buffer.js)
  * [format.js](daemi/08.format.js)
* FS
  * [readfile.js](daemi/09.readfile.js)
  * [set-num.js](daemi/10.set-num.js)
  * [set-num-file-broken.js](daemi/11.set-num-file-broken.js)
  * [set-num-file-fixed.js](daemi/12.set-num-file-fixed.js)
* Promises
  * [promise.js](daemi/13.promise.js)
  * [promisify.js](daemi/14.promisify.js)
  * [async-await.js](daemi/15.async-await.js)
  * [unhandled.js](daemi/16.unhandled.js)

## Aukaefni

* [Node.js APIs](https://nodejs.org/api/)
  * [`console`](https://nodejs.org/api/console.html)
  * [Timers](https://nodejs.org/api/timers.html)
  * [`process`](https://nodejs.org/api/process.html)
  * [Debugger](https://nodejs.org/api/debugger.html)
  * [`Buffer`](https://nodejs.org/api/buffer.html)
  * [CommonJS modules](https://nodejs.org/api/modules.html)
  * [ECMAScript modules](https://nodejs.org/api/esm.html)
  * [`util`](https://nodejs.org/api/util.html)
  * [`fs`](https://nodejs.org/api/fs.html)
* [nvm](https://github.com/creationix/nvm)
* [nvm-windows](https://github.com/coreybutler/nvm-windows)
* [Jake Archibald: In The Loop, fyrirlestur um Event Loop í JavaScript](https://www.youtube.com/watch?v=cCOL7MC4Pl0)
* [Node.js debugging in VS Code](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)

## Ítarefni

* [Ryan Dahl: Original Node.js presentation, árið 2009](http://www.youtube.com/watch?v=ztspvPYybIY)
* [V8 Open source JavaScript vél frá Google](https://v8.dev/)
* [Node.js ES support](http://node.green/)
* [Read-Eval-Print Loop](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)
* [Wikipedia: Standard streams](https://en.wikipedia.org/wiki/Standard_streams)
* [libuv](https://en.wikipedia.org/wiki/Libuv)
* [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
