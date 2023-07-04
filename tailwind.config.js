const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        pnc: '#EE3511',
        pncHover: '#580E03',
        foodHubColor1: '#AB6B00',
        foodHubColor2: '#0040AB'
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        '2': 'minmax(0, 5rem) minmax(0, 1fr)',

        // Complex site-specific column configuration
        'footer': '200px minmax(900px, 1fr) 100px',
      },
      gridTemplateRows: {
        '2': 'minmax(0, 5rem) minmax(0, 1fr)',
      },
      height: {
        cartHeight: '508px'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  // config (optional)
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
}
