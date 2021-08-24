// @ts-nocheck
const colors = require('tailwindcss/colors');

module.exports = {
  mode: "jit",
  purge: ["./content/**/*.md", "./content/**/*.html", "./layouts/**/*.html", "./assets/components/**/*.html", "./assets/components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {},
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}