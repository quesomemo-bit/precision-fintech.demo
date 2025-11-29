/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'precision-green': {
          600: '#059669',
          700: '#047857',
        },
        graphite: {
          100: '#f3f4f6',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        'precision': {
          'green': {
            400: '#10b981',
            600: '#059669',
            700: '#047857',
            900: '#064e3b',
          },
        },
      },
    },
  },
  plugins: [],
}
