module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      serif: 'Quicksand',
      sans: 'Montserrat',
      display: 'Megrim',
    },
    boxShadow: {
      neuShadow:
        '-4px -4px 10px rgb(255, 255, 255), 4px 4px 10px rgba(0, 0, 0, 0.219)',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
