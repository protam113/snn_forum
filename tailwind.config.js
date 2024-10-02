/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "custom-red": "#BF2734",
        "custom-zinc": "#1c1e21",
        "main-blue1": "#008FD5",
        "main-blue2": "#1876D0",
        "white-blue1": "#F0F9FF",
        "white-blue2": "#F1F7FE",
        "milk-blue1": "#7cd4fd",
        "hover-blue1": "#7CD4FD",
        "border-blue1": "#07304A",
        "dark-blue2": "#0b2346",
        "nav-blue1": "#0CA9EB",
      },
      screens: {
        sm: "640px", // Small devices (phones)
        md: "768px", // Medium devices (tablets)
        lg: "1024px", // Large devices (desktops)
        xl: "1280px", // Extra large devices (large desktops)
        "2xl": "1536px", // 2XL devices
      },
      fontSize: {
        10: "10px",
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        24: "24px",
      },
      borderWidth: {
        0.5: "0.5px",
      },
    },
  },
  plugins: [],
};
