const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss").Config} */ 
module.exports = {
    content: ["./src/**/*\.{html,css,js,ts,svelte}"],
    theme: {
      extend: {
        colors: {
          backdrop: colors.slate[800],
          block: colors.slate[900],
          title: colors.indigo[400],
          text: colors.slate[400],
          "button-text": colors.indigo[500],
          icon: colors.white,
          menu: colors.slate[700],
          "menu-text": colors.gray[300],
          button: colors.indigo[400],
          hover: colors.indigo[700]
        }
      }
    },
    variants: {
      extend: {}
    },
    plugins: [
      require("@tailwindcss/forms")
    ]
}
