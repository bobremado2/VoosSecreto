/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#0A2647', // Azul escuro para fundo/cabeçalho
          DEFAULT: '#144272',
        },
        accent: {
          DEFAULT: '#F4A460', // Amarelo/dourado para destaques
          light: '#FFD700',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
