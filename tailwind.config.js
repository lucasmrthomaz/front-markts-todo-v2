/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: true, // This ensures Tailwind classes take precedence when needed
  theme: {
    extend: {},
  },
  plugins: [],
};