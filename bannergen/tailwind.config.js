/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    './vueform.config.js',
    './node_modules/@vueform/vueform/themes/tailwind/**/*.vue',
    './node_modules/@vueform/vueform/themes/tailwind/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        blackMute: '#282828',
        blackSoft: '#222222'
      }
    },
  },
  plugins: [
    require('@vueform/vueform/tailwind'),
  ],
}

