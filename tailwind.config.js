const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#5063bf',
      },
    },
  },
  plugins: [require("tw-elements/plugin.cjs")],
  plugins: [require('daisyui')],
  darkMode: "class"
});