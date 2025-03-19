/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          500: '#e50609',
          600: '#b22222',
        },
      },
      fontFamily: {
        metal: ['Metal Mania', 'cursive'],
      },
    },
  },
  plugins: [],
} 