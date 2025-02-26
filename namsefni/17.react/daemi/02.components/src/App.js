import React from 'react';

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

class WelcomeClass extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// Welcome og WelcomeClass haga sér nákvæmlega eins, annar er functional, hinn
// class. Við notum alltaf functional components, nema einhver sérstæk ástæða.

function FooBar() {
  // react mun kvarta yfir því að element vanti key
  // sést í console þegar við keyrum upp forritið
  return [
    <p>foo</p>,
    <p>bar</p>,
  ];
}

function NullComponent() {
  return null;
}

function Table() {
  return (
    <table>
      <tbody>
        <tr>
          <Columns />
        </tr>
      </tbody>
    </table>
  );
}

function Columns() {
  return (
    <React.Fragment>
      <td>Foo</td>
      <td>Bar</td>
    </React.Fragment>
  );
}

export default function App() {
  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((number) => (
    <li key={number.toString()}>
      {number}
    </li>
  ));

  return (
    <main>
      <Welcome name="foo" />
      <NullComponent />
      <WelcomeClass name="bar" />
      <FooBar />

      {listItems}

      <Table />

      <React.Fragment>foo</React.Fragment>
    </main>
  );
}
