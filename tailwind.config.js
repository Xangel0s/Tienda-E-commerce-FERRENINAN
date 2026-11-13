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
          50: '#fff1f1',
          100: '#ffe1e1',
          200: '#ffc7c7',
          300: '#ffa0a0',
          400: '#ff6b6b',
          500: '#fe0000', // Color oficial FERRENINAN
          600: '#e00000',
          700: '#bc0000',
          800: '#9b0303',
          900: '#800a0a',
          dark: '#111827',
          charcoal: '#1f2937',
          graybg: '#f4f5f7'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 20px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}
