import React, { Component, useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

class DataClass extends Component {
  state = {
    data: [1, 2, 3, 4, 5, 6, 7],
  }

  del = id => () => {
    const { data } = this.state;
    this.setState({ data: data.filter(i => i !== id) });
  }

  render() {
    const { data } = this.state;

    return (
      <ul>
        {data.map(item => (
          <li key={item}>
            {item}
            <button onClick={this.del(item)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }
}

function Data() {
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7]);

  const handleClick = id => () => {
    setData(data.filter(i => i !== id));
  }

  return (
    <ul>
      {data.map(item => (
        <li key={item}>
          {item}
          <button onClick={handleClick(item)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  return (
    <div>
      <Counter />
      <hr />
      <DataClass />
      <hr />
      <Data />
    </div>
  );
}
