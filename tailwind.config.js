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
        'montserrat': ['montserrat', 'sans-serif'],
        'poppins': ['poppins', 'sans-serif'],
        'space-grotesk': ['space-grotesk-variable', 'sans-serif'],
        'outfit': ['outfit', 'sans-serif'],
        'new-astro': ['new-astro', 'sans-serif'],
        'new-astro-soft': ['new-astro-soft', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}

