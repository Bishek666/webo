/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{html,js,jsx}"],
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height',
      },
      boxShadow: {
        neuMorphismShadow: "20px 20px 60px #bebebe,-20px -20px 60px #ffffff;",
        neuMorphismShadowSm: "5px 5px 60px #bebebe,-5px -5px 60px #ffffff;",
      },
      keyframes: {
        'moon-orbit': {
          "0%": { transform: "translate(0)" },
          "50%": { transform: "translate(-250px)" },
          "100%": { transform: "translate(0)" },
        },
      },
      animation: {
        'moon-orbit': 'moon-orbit 6s ease-in-out infinite'
      }
    },
  },
  plugins: [require("tailwindcss-filters")],
};
