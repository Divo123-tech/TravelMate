/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        "baby-powder": "#F4F6EF",
        teal: "#327D81",
        "oxford-blue": "#13294B",
        "alice-blue": "#F0F8FF",
        "champion-blue": "#606788",
        turquoise: "#AFEEEE",
      },
      fontFamily: {
        FatFace: ["Playfair Display", "sans-serif"],
        Rethink: ["Rethink Sans", "sans-serif"],
        Oswald: ["Raleway", "sans-serif"],
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
