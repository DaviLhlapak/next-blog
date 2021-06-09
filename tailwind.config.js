module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'sans-serif'],
    },
    extend: {
      keyframes: {
        'progress-bar-width': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        }
      },
      animation: {
        'progress-bar': 'progress-bar-width 4.5s linear 1',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
