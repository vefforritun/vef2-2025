import React, { useState } from 'react'

const defaultTheme = 'dark';

export const Context = React.createContext({
  theme: defaultTheme,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <Context.Provider value={{
      theme,
      toggleTheme,
    }}>
      {children}
    </Context.Provider>
  )
}

/*
export default class ThemeProvider extends Component {
  state = {
    theme: defaultTheme,
  }

  toggleTheme = () => {
    const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';

    this.setState({ theme: newTheme });
  }

  render() {
    const { children } = this.props;
    const { theme } = this.state;

    return (
      <Context.Provider value={{
        theme,
        toggleTheme: this.toggleTheme,
      }}>
        {children}
      </Context.Provider>
    );
  }
}
*/
