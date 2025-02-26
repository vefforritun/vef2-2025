import React, { Component } from 'react';
import PropTypes from 'prop-types';

function Foo({ title, type = 'foo' , user = null, onClick = () => {} }) {
  return (
    <div className="foo">
      <h1 onClick={onClick}>{title}</h1>
      <p>Ég er {type}</p>

      <p>Notandi:</p>
      <ul>
        <li>Nafn: {user.name}</li>
        <li>Aldur: {user.age}</li>
      </ul>
    </div>
  );
}

Foo.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['foo', 'bar']),
  user: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
  }),
  onClick: PropTypes.func,
};

class Bar extends Component {
  static propTypes = {
    name: PropTypes.string,
  }

  static defaultProps = {
    name: 'NN',
  }

  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
      </div>
    );
  }
}

export default function App() {
  const user = {
    name: 'Óli',
    age: '??',
  };

  return (
    <div>
      <Foo
        title="Halló!"
        user={user}
        onClick={() => { console.log('halló'); }}
      />
      <Bar />
    </div>
  );
}
