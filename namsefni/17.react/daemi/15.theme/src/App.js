import React, { useContext } from 'react';

import { Button } from './Button';
import { Context } from './Theme';

export default function App() {
  const themeContext = useContext(Context);

  return (
    <main>
      <Button>Takki sem gerir ekkert en hlustar á context breytingu</Button>

      <p>Þemað er: {themeContext.theme}</p>
      <Button onClick={themeContext.toggleTheme}>Breyta þema</Button>
    </main>
  );
}
