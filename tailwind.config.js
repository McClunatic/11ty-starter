module.exports = {
  content: ['./src/**/*.html'],
  theme: {
    fontFamily: {
      sans: ['Noto Sans', 'sans-serif'],
      serif: ['Noto Serif', 'serif'],
    },
    extend: {
      gridTemplateColumns: {
        'mobile': '1fr',
        'two': '1fr 3fr',
      },
      gridTemplateRows: {
        'mobile': 'repeat(3, auto) 1fr auto',
        'four': 'repeat(2, auto) 1fr auto',
      }
    },
  },
  plugins: [],
}
