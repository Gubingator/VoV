/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { //Vandy Colors
        black: '#1C1C1C',
        white: '#FFFFFF',
        MetallicGold: '#FEEEB6',
        FlatGold: '#CFAE70',
      }
    },
  },
  plugins: [],

  // doesnt work here fro group-hover: 
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    },
}
