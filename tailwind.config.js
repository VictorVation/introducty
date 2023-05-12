const colors = require("tailwindcss/colors");
const brandColor = colors.teal;
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      brand: brandColor,
    },
    ringColor: {
      DEFAULT: brandColor["500"],
    },
  },
  plugins: [],
};
