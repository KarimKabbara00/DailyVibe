/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      padding: {
        standard: "3rem",
      },
      margin: {
        standard: "3rem",
      },
      borderRadius: {
        standard: "5px",
      },
      colors: {
        primary: "#2F6690",
        secondary: "#DBAB1E",
      },
      height: {
        navHeight: "7dvh",
        contentHeight: "93dvh",
      },
      screens: {
        xlScreen: { max: "1280px" },
        smScreen: { max: "600px" },
        xsScreen: { max: "450px" },
      },
    },
  },
  plugins: [],
};
