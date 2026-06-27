/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        parchment: "#f6efe5",
        ink: "#1c1917",
        ember: "#c2410c",
        clay: "#f3d7be",
        ocean: "#155e75",
        moss: "#365314",
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        sans: ["Trebuchet MS", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        glow: "0 28px 70px -30px rgba(120, 53, 15, 0.45)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
      },
    },
  },
};
