/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        surface: '#1E293B',
        surface2: '#334155',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at top left, #1e3a5f 0%, #0f172a 60%)',
      },
    },
  },
  plugins: [],
}
