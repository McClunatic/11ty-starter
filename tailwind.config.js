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
        'mobile': 'repeat(3, auto) max-content 1fr',
        'four': 'repeat(2, auto) max-content 1fr',
      }
    },
  },
  plugins: [],
}
