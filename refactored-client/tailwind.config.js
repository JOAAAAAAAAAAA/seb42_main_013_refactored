/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nanumGothic: ['var(--font-NanumGothic)'],
        roboto: ['var(--font-Roboto)'],
    },
  }
  },
  plugins: [],
}
