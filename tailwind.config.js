/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        header: "4.5rem",
      },
      container: {
        screens: {
          lg: "768px",
          xl: "1024px",
          "2xl": "1280px",
        },
      },
    },
  },
  plugins: [],
};
