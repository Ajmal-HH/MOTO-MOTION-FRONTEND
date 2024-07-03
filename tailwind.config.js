/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
    extend: {},
    fontFamily:{
      googleFont : ["Itim","cursive"]
    }
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  }
//   plugins: [ require('daisyui'),
// ],
}

