const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
        
  ], 
  darkMode: true,
  theme: {
    extend: {
      fontFamily:{
        DM:["Mulish", "serif"],
        roboto:['Roboto','seri']
      },
      colors: {
        customPurple: '#7B1984',
        customBg :"#F1F1F1",
      }
    },
  },
  plugins:  [
    plugin(({ addUtilities }) => {
      addUtilities({
        /* Chrome, Safari and Opera */
        ".scrollbar-hidden::-webkit-scrollbar": {
          display: "none",
        },

        ".scrollbar-hidden": {
          "scrollbar-width": "none" /* Firefox */,
          "-ms-overflow-style": "none" /* IE and Edge */,
        },
      })
    }),
  ]
}