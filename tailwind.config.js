/** @type {import('tailwindcss').Config} */

function withOpacity(variable_name) {
  return ({ opacityValue }) => {
    if (opacityValue) return `rgba(var(${variable_name}), ${opacityValue})`;
    return `rgba(var(${variable_name}))`;
  };
}

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: withOpacity("--color-text-base"),
          muted: withOpacity("--color-text-muted"),
          inverted: withOpacity("--color-text-inverted"),
          highlight: withOpacity("--color-text-highlight"),
        },
      },
      backgroundColor: {
        skin: {
          fill: withOpacity("--color-fill"),
          "button-accent": withOpacity("--color-button-accent"),
          "button-hover": withOpacity("--color-button-hover"),
          "button-muted": withOpacity("--color-button-muted"),
        },
      },
    },
  },
  plugins: [],
};
