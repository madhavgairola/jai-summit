/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Outfit', 'Poppins', 'Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        wander: {
          bg: '#e9eef3',
          surface: '#ffffff',
          inset: '#f1f4f8',
          slate: '#73879c',
          dark: '#0f172a',
          navy: '#0b1329',
          accent: '#2563eb',
        }
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.06)',
        'hero': '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
      }
    },
  },
  plugins: [],
}
