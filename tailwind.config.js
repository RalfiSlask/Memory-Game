/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'green-flash': {
          '0%': { backgroundColor: '#FDA214' }, 
          '33%': { backgroundColor: '#32CD32' },    // green color
          '100%': { backgroundColor: '#BCCED9' },  // End with the taken color
        },
        'red-flash': {
          '0%': { backgroundColor: '#FDA214' }, 
          '33%': { backgroundColor: 'red' },    // red color
          '100%': { backgroundColor: '#304859' },  // End with original color
        },
      },
      animation: {
        "green-flash": "green-flash 0.5s forwards",
        "red-flash": "red-flash 0.5s forwards",
      }
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
