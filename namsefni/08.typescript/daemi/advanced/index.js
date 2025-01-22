"use strict";
var _a, _b;
var product = {
    category: {
        id: 10,
        title: "Flokkur",
    },
    id: 1,
    price: 100,
    title: "Prufuvara",
};
console.log('product :>> ', product);
var foo = 1;
var foobar = { foo: 'bar' };
var bar = null;
console.log(foo, foobar, bar);
var formState = 'loading';
formState = 'data'; // Má ekki!
console.log(formState);
// Má ekki, verður að vera með gildi
//const props: IProps = null;
// Type getur verið samblanda af interface og öðru
// type PropsOrNull = IProps | null;
// const props: PropsOrNull = null;
// Eða við getum skilgreint beint, gerum það yfirleitt
var props = null;
console.log(props);
// -----
var newProduct = {
    id: 1,
    title: 'new product',
    price: 999
};
if (Math.random() < 0.5) {
    newProduct = null;
}
//console.log(newProduct.title);
//console.log(newProduct.category.title);
//console.log();
var title = (_b = (_a = newProduct === null || newProduct === void 0 ? void 0 : newProduct.category) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : null;
if (title) {
    document.title = title;
}
// ----
// Í strict mode verðum við að skilgreina týpur
function greet(name) {
    return "hello, ".concat(name);
}
var worldGreeting = greet('world');
var greeting = greet('óli');
console.log(worldGreeting);
console.log(greeting);
// TypeScript bannar okkur þetta ef við setjum type á `name` argument í greet
var invalidGreeting = greet('1');
console.log(invalidGreeting);
// -----
