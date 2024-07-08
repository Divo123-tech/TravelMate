/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        "nav-color": "#F4F6EF",
        "loctab-color": "#327D81",
        "trip-color": "#13294B",
      },
      fontFamily: {
        arial: ["Arial", "sans-serif"],
        helvetica: ["Helvetica", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
};
