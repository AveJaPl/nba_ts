import react from '@vitejs/plugin-react-swc';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'nba-blue': '#1D428A',
        'nba-red': '#CE1141',
        'nba-gray': '#BCC4CC',
        'nba-white': '#FFFFFF',

      },
      backgroundColor: {
        'primary': '#ffffff',
        'secondary': '#f5f5f5',
        'dark-primary': '#1a1a1a',
        'dark-secondary': '#2a2a2a',
      }
    },
    variants: {
      extend: {},
    },
    plugins: [react()],
  }
}
