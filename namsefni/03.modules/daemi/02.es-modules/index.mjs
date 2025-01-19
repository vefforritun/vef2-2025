import lib, { data, data as DATA } from './lib.mjs';
import { add, foo } from './module/index.js';

console.log(lib);
console.log(data);
console.log(DATA);
console.log(foo);

console.log(add(1, 2));
