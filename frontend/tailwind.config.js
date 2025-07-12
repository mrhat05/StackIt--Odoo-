/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7c3aed', // purple
          dark: '#5b21b6',
          light: '#a78bfa',
        },
        accent: {
          DEFAULT: '#facc15', // yellow
        },
        secondary: {
          DEFAULT: '#14b8a6', // teal
        },
        background: {
          DEFAULT: '#fff', // white
          dark: '#1e1b4b', // deep purple background
        },
      },
    },
  },
  plugins: [],
} 