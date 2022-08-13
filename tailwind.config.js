/** @type {import("tailwindcss").Config} */ 
module.exports = {
    content: ["./src/**/*\.{html,css,js,ts,svelte}"],
    theme: {
      extend: {}
    },
    variants: {
      extend: {}
    },
    plugins: [
      require("@tailwindcss/forms")
    ]
}
