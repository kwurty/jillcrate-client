/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-chill': {
          '50': '#ecfbff',
          '100': '#cff4fe',
          '200': '#a5e9fc',
          '300': '#67daf9',
          '400': '#22c2ee',
          '500': '#06a8d4',
          '600': '#088db2',
          '700': '#0e7490',
          '800': '#156075',
          '900': '#165263',
          '950': '#083744',
      },
      },},
  },
  plugins: [],
}