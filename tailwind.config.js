/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
          100: '#f5ffe3',   // Light shade
          200: '#e2ffaa',  // Lighter shade
          300: '#ceff71',        // Base color
          400: '#baff39',   // Darker shade
          500: '#a7ff00',   // Dark shade
          600: '#82c600',   // Darker shade
          700: '#5d8e00', // Even darker
          800: '#385500', // Very dark
          900: '#131c00', // Darkest
        },
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
