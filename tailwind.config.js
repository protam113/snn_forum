/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "custom-red": "#BF2734",
      },
      screens: {
        mobile: "640px",
        tablet: "768px",
        desktop: "1024px",
      },
      fontSize: {
        14: "14px",
        16: "16px",
        20: "20px",
        24: "24px",
      },
    },
  },
  plugins: [],
};
