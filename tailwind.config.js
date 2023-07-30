/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF0063',
        secondary: '#B1B1B1',
        third: '#66BFBF',
        fourth: '#EAF6F6',
        fivth: '#66BFBF'
      }
    },
  },
  plugins: [],
}