/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F53850',
        'primary-dark': '#D32F2F',
      },
      keyframes: {
        zoomIn: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.2)' },
        },
      },
      animation: {
        zoomIn: 'zoomIn 0.3s ease-in-out forwards',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

