/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primaire Theme
        "primaire-main": "#FF6B9D",
        "primaire-light": "#FFE5F0",
        "primaire-accent-gold": "#F5A962",
        "primaire-accent-secondary": "#7ED4CE",

        // Collège/Lycée Theme (default)
        "college-main": "#2C5AA0",
        "college-light": "#F5E6D3",
        "college-accent-gold": "#D4AF37",
        "college-accent-secondary": "#5D7B6F",

        // Université Theme
        "universite-main": "#2C3E50",
        "universite-light": "#ECF0F1",
        "universite-accent-gold": "#1ABC9C",
        "universite-accent-secondary": "#34495E",

        // Universal
        "success": "#27AE60",
        "error": "#E74C3C",
        "warning": "#F39C12",
        "info": "#3498DB",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "brand": "0 4px 12px rgba(44, 90, 160, 0.1)",
        "md": "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
}
