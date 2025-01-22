interface ICategory {
  id: number;
  title: string;
}

interface IProduct {
  id: number;
  title: string;
  price: number;
  category?: ICategory;
  description?: string;
}

const product: IProduct = {
  category: {
    id: 10,
    title: "Flokkur",
  },
  id: 1,
  price: 100,
  title: "Prufuvara",
};
console.log('product :>> ', product);

// Mjög skrítin týpa..
type MyType = number | { foo: string; } | null;
const foo: MyType = 1;
const foobar: MyType = { foo: 'bar' };
const bar: MyType = null;

console.log(foo, foobar, bar);

type state = 'loading' | 'data' | 'error';
let formState: state = 'loading';
formState = 'data'; // Má ekki!

console.log(formState);

// Getum búið til interface fyrir props í react
interface IProps {
  // getum sett any, en ekki ráðlagt
  onClick: (e: Event) => void;
  onUpdated: () => boolean;
}

// Má ekki, verður að vera með gildi
//const props: IProps = null;

// Type getur verið samblanda af interface og öðru
// type PropsOrNull = IProps | null;
// const props: PropsOrNull = null;

// Eða við getum skilgreint beint, gerum það yfirleitt
const props: IProps | null = null;

console.log(props);

// -----

let newProduct: IProduct | null = {
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

const title = newProduct?.category?.title ?? null;

if (title) {
  document.title = title;
}

// ----

// Í strict mode verðum við að skilgreina týpur
function greet(name: string): string {
  return `hello, ${name}`;
}

const worldGreeting = greet('world');
const greeting = greet('óli');

console.log(worldGreeting);
console.log(greeting);

// TypeScript bannar okkur þetta ef við setjum type á `name` argument í greet
const invalidGreeting = greet('1');
console.log(invalidGreeting);

// -----


