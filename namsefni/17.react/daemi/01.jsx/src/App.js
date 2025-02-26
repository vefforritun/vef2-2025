import React from 'react';
import { Toggle as ClassToggle } from './Toggle.class';
import { Toggle as FunctionalToggle } from './Toggle.functional';

const xss = '<script>alert(1)</script>';

const img = {
  url: 'https://www.hi.is/sites/default/files/drupal/pallas_vert.svg',
}

const headingWithoutJsx = React.createElement(
  'h1',
  { className: 'greeting' },
  React.createElement(
    'span',
    null,
    'Hello, world!',
  ),
);

export default function App() {
  return (
    <div>
      <p>Testing {[1, 2, 3, 4].join(', ')}</p>

      <p className="foo" data-foo="bar" data-bar={3 * 3}>bar</p>

      {/* Comment innan JSX! */}
      <p>{xss}</p>

      {/* Fáum lint villu um að það vanti alt attribute */}
      <img src={img.url} className="image" />

      {/* Munum fá warning um <h1> innan <p> fyrir næstu línu */}
      <h1 className="greeting">
        <span>Hello, world!</span>
      </h1>

      {headingWithoutJsx}

      <hr />

      {/* Ef við skrifum með litlu c munum við fá villu */}
      <ClassToggle />

      <hr />

      <FunctionalToggle />
    </div>
  );
}
