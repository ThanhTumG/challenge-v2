/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat'],
        'raleway': ['Raleway'],
        'lato': ['Lato'],
        'garamond': ['Garamond'],
        'poppins': ['Poppins'],
        'roboto': ['Roboto'],
        'mysteryquest': ['Mystery Quest'],
        'montserrat': ['Montserrat']
      }
    },

  },
  plugins: [],
}



