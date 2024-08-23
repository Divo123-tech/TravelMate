/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        "oxford-blue": "#13294B",
        "alice-blue": "#F0F8FF",
        "champion-blue": "#606788",
        turquoise: "#AFEEEE",
      },
      fontFamily: {
        Playfair: ["Playfair Display", "sans-serif"],
        Rethink: ["Rethink Sans", "sans-serif"],
        Raleway: ["Raleway", "sans-serif"],
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
