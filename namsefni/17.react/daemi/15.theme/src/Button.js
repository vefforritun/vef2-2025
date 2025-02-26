import React, { useContext } from 'react';

import { Context } from './Theme';

export function Button(props) {
  const { children, onClick } = props;
  const { theme } = useContext(Context);

  const style = {
    color: theme === 'dark' ? 'white' : 'black',
    backgroundColor: theme === 'dark' ? 'black' : 'white',
  };

  return (
    <button onClick={onClick} style={style}>{children}</button>
  );

  // Takki notar Theme Contextið sem consumer
  // "Render props" sjá um að skaffa gildin
  // Ekki jafn læsilegt og með useContext
  /*
  return (
    <Context.Consumer>
      {(context) => {
        const { theme } = context;

        const style = {
          color: theme === 'dark' ? 'white' : 'black',
          backgroundColor: theme === 'dark' ? 'black' : 'white',
        };
        return (
          <button onClick={onClick} style={style}>{children}</button>
        );
      }}
    </Context.Consumer>
  );
  */
}
