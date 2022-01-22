module.exports = {
  content: ['./src/**/*.html'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Noto Sans', 'sans-serif'],
      serif: ['Noto Serif', 'serif'],
    },
    extend: {
      backgroundImage: {
        'chevron': 'url("/assets/chevron.svg")',
        'sun': 'url("/assets/sun.svg")',
        'moon': 'url("/assets/moon.svg")',
      },
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
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
