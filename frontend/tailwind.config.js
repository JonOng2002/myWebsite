/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'linkedin-blue': '#0288d1'
      },
      fontFamily: {
        sans: ['DM Sans', 'serif']
      }
    },
  },
  plugins: [],
}

