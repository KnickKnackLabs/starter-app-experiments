/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app.tsx", "./index.js", "../../packages/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
