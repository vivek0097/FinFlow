// import React, { createContext, useContext, useState, useEffect } from 'react';

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');

//   useEffect(() => {
//     const root = window.document.documentElement;
//     if (isDark) {
//       root.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       root.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [isDark]);

//   return (
//     <ThemeContext.Provider value={{ isDark, toggleTheme: () => setIsDark(!isDark) }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);


import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark' || false
  );

  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    const root = window.document.documentElement; 
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);