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
      },
      fontFamily: {
        'sans': ['proxima-nova', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'source': ['source-sans-pro', 'sans-serif'],
        'proxima': ['proxima-nova', 'sans-serif'],
        'cofo': ['cofo-raffine', 'sans-serif'],
        'hitch': ['hitch-route-serif', 'Hitch Route Serif', 'serif'],
        'october': ['october-dreams', 'October Dreams', 'cursive'],
      }
    },
  },
  plugins: [],
}

