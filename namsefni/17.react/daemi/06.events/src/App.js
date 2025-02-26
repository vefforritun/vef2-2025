import React, { Component } from 'react';

function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#click" onClick={handleClick}>
      Click me
    </a>
  );
}

class Bindings extends Component {
  constructor(props) {
    super(props);

    this.constructorBound = this.constructorBound.bind(this);
  }

  unbound() {
    console.log(this);
  }

  constructorBound() {
    console.log(this);
  }

  publicBound = (e) => {
    console.log(this);
  }

  render() {
    return (
      <div>
        <p><button onClick={this.unbound}>unbound</button></p>
        <p><button onClick={this.constructorBound}>constructorBound</button></p>
        <p><button onClick={() => this.unbound()}>event bound</button></p>
        <p><button onClick={this.publicBound}>publicBound</button></p>
      </div>
    );
  }
}

function Data() {
  const del = (id, e) => {
    console.log(`Deleting ${id}`, e);
  }

  const handleClick = id => (e) => {
    console.log(`Deleting ${id}`, e);
  }

  const items = [1, 2, 3, 4, 5, 6, 7];

  return (
    <ul>
      {items.map(item => (
        <li key={item}>
          {item}
          <button onClick={e => del(item, e)}>Delete</button>
          <button onClick={handleClick(item)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}


export default function App() {
  return (
    <div>
      <ActionLink />
      <Bindings />
      <Data />
    </div>
  );
}
