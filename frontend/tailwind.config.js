/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        neu: {
          bg: '#e6e7ee',
          text: '#6b6b6b', // Updated to user request
          accent: '#6d5dfc', 
          btn: '#d1d3e0', // New button base color
        }
      },
      boxShadow: {
        'neu-flat': '6px 6px 12px #b8b9be, -6px -6px 12px #ffffff',
        'neu-pressed': 'inset 6px 6px 12px #b8b9be, inset -6px -6px 12px #ffffff',
        'neu-convex': 'linear-gradient(145deg, #f6f7ff, #cfd0d6)',
        'neu-concave': 'linear-gradient(145deg, #cfd0d6, #f6f7ff)',
        'neu-btn-flat': '5px 5px 10px #b1b3be, -5px -5px 10px #f1f3ff', // Slightly different for darker button
        'neu-btn-pressed': 'inset 5px 5px 10px #b1b3be, inset -5px -5px 10px #f1f3ff',
      },
      transitionDuration: {
        '200': '200ms',
      }
    },
  },
  plugins: [],
}
