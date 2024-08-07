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
        FatFace: ["Abril Fatface", "sans-serif"],
        Rethink: ["Rethink Sans", "sans-serif"],
        Oswald: ["Oswald", "sans-serif"],
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
