const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss").Config} */ 
module.exports = {
    content: ["./src/**/*\.{html,css,js,ts,svelte}"],
    theme: {
      extend: {
        colors: {
          backdrop: colors.white,
          block: colors.neutral[100],
          title: colors.indigo[800],
          text: "#586E75",
          "button-text": colors.indigo[700],
          icon: "#586E75",
          menu: colors.slate[700],
          "menu-text": "#586E75",
          button: colors.indigo[500],
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
