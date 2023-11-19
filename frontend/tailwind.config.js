const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      white: "#ffffff",
      black: "#000000",
      primary: '#DF6751',
      primarylight: '#F8F7F7',
      lightgrey: "#444245",
      grey: 'rgba(0, 0, 0, 0.55)',
      primarybg: 'rgba(223, 103, 81, 0.15)',
      darkprimary: '#FEEDEA',
      lightblack: '#333333',
      textbl: "#363636",
      footerlinks: 'rgba(54, 54, 54, 0.9)',
      bordertop: 'rgba(105, 120, 131, 0.16)',
      darkgrey: 'rgba(44, 9, 11, 0.8)',
      transparent: "transparent",
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.25rem"],
      "5xl": ["3rem", { lineHeight: "4.25rem" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "6.75rem" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    extend: {},
  },
  plugins: [],
};
