/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        mirage: "#161b26",
        ebony: "#0c111d",
        gray60: "#9E9E9E",
        gray50: "#C2C2C2",
        gray40: "#E0E0E0",
        pink60: "#ED4CF0",
        redOrange: "#FF3B30",
        orangePeel: "#FF9F0A",
        greenDarkMint: "#35C95A",
      },
      fontFamily: {
        sans: ["Montserrat", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
