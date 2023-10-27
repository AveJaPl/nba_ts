/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'nba-blue': '#1D428A',
        'nba-red': '#CE1141',
        'nba-gray': '#BCC4CC',
        'nba-white': '#FFFFFF',

    },
  },
  plugins: [],
}
}
