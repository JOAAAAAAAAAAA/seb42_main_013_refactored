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
  important: '#app',
  // https://tailwindcss.com/docs/configuration#important
  // https://mui.com/material-ui/guides/interoperability/#tailwind-css
  // tailwind 로 mui를 override하기 위해 사용
  plugins: [],
}
