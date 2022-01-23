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
        'mobile': '1fr',
        'two': '1fr 3fr',
        'three': '1fr 3fr 1fr',
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
