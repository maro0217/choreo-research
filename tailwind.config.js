/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "500px",
      sm: "800px",
      md: "1000px",
      lg: "1200px",
      xl: "1400px",
    },
    extend: {},
  },
  plugins: [],
};
