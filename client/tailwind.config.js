/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        "baby-powder": "#F4F6EF",
        teal: "#327D81",
        "oxford-blue": "#13294B",
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
