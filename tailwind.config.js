/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    },
  },
  plugins: [],
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.triangle-big': {
          width: '0',
          height: '0',
          borderColor: 'transparent transparent #FDA214 transparent',
          borderStyle: 'solid',
          borderWidth: '0 20px 20px 20px',
        },
        '.triangle-small': {
          width: '0',
          height: '0',
          borderColor: 'transparent transparent #FDA214 transparent',
          borderStyle: 'solid',
          borderWidth: '0 10px 10px 10px',
        },
        '.triangle-medium': {
          width: '0',
          height: '0',
          borderColor: 'transparent transparent #FDA214 transparent',
          borderStyle: 'solid',
          borderWidth: '0 15px 15px 15px',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ]
}
