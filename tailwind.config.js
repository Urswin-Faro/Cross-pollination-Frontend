/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <--- Add this line!
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#051926',
        darkCard: '#092537',
        accentCyan: '#00f0ff',
        accentTeal: '#00b4d8',
      },
    },
  },
  plugins: [],
}