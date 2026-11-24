/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#fbf7f4',
          100: '#f5eee7',
          200: '#eddcd0',
          300: '#dfc2b0',
          400: '#cb9f85',
          500: '#b88162',
          600: '#9d664a',
          700: '#83523c',
          800: '#6d4434',
          900: '#58382c',
          950: '#301c15',
        },
        agrigreen: {
          50: '#f1f8f3',
          100: '#dceee0',
          500: '#2e7d32',
          600: '#236526',
          700: '#1b4f1e',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
