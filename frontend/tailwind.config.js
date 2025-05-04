/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'kenya-black': '#000000',
          'kenya-red': '#EF4444',
          'kenya-green': '#15803D',
          'kenya-white': '#FFFFFF',
        }
      },
    },
    plugins: [],
  }