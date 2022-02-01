module.exports = {
  content: ['./src/**/*.html'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Noto Sans', 'sans-serif'],
      serif: ['Noto Serif', 'serif'],
    },
    extend: {
      gridTemplateColumns: {
        'mobile': '100%',
        'two': '25% 75%',
        'three': '22.5% 55% 22.5%',
      },
      gridTemplateRows: {
        'mobile': 'repeat(3, auto) 1fr auto',
        'four': 'repeat(2, auto) 1fr auto',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
