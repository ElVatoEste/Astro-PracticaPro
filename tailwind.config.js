/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7DBB00", // Se define el color sin el `0xFF`
      },
    },
  },
  plugins: [],
};
