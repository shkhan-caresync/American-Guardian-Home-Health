/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#0B1220",
          steel: "#2F435B",
          aqua: "#33D3D5",
          aqua2: "#13BDBF",
          mist: "#B8C6D6",
          glow: "rgba(51, 211, 213, 0.45)",
        }
      }
    },
  },
  plugins: [],
}

