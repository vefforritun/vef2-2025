/*
 * Setja þarf upp typescript globally
 * npm install -g typescript
 *
 * og túlka í javascript
 * tsc index.ts
 */

function makeString(a: string): string {
  if (a) {
    return "1";
  }
  return a + "foo";
}

function greet(name: string): string {
  return `hello, ${name}`;
}
const foo = makeString("foo");

const worldGreeting = greet(foo);
const greeting = greet("óli");

console.log(worldGreeting);
console.log(greeting);

// TypeScript bannar okkur þetta ef við setjum type á `name` argument í greet
const invalidGreeting = greet("1");
console.log(invalidGreeting);

function add(x: number, y: number): number {
  return x + y;
}

function sum(...nums: number[]): number {
  return nums.reduce((x, y) => x + y, 0);
}

const result: number = add(1, 2);
const summed: number = sum(1, 2, 3, 4);

console.log(result);
console.log(summed);

let person = {
  name: "nn",
  age: 1,
};

if (Math.random() < 0.5) {
  person = null;
}

console.log(person.name);
