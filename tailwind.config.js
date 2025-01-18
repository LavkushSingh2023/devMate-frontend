module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Ensure paths are correct here
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
