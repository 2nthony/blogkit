// Modified from shuding/nextra

const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./src/**/*.{ts,css,tsx}'],
  theme: {
    fontFamily: {
      display: [
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      ],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      gray: colors.gray,
      slate: colors.slate,
      neutral: colors.neutral,
      red: colors.red,
      orange: colors.orange,
      yellow: colors.yellow,
      prime: colors.blue,
      green: colors.green,
      sky: colors.sky,
      violet: colors.violet,
      pink: colors.pink,
      rose: colors.rose,
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
