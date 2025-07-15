import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#00d1b3',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'heading-1': ['1.785rem', { lineHeight: '1.2' }],
        body:        ['0.9375rem', { lineHeight: '1.4' }],
      },
      borderRadius: {
        xl:  '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config