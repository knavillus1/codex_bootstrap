/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#A4CCD9',
        secondary: '#C4E1E6',
        accent: '#EBFFD8',
      },
    },
  },
  plugins: [],
};
