/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ativa o dark mode via classe (ex.: adicionando "dark" ao elemento raiz)
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'multi-gold':
          'linear-gradient(to right, #fad2a4 0%, #f6cda0 3%, #ca9674 35%, #aa6e55 63%, #965641 85%, #8f4d3a 98%)'
      },
      // Exemplo: Adicionando cores customizadas para dark mode
      colors: {
        dark: {
          bg: '#333333',
          text: '#ffffff'
        }
      }
    }
  },
  plugins: []
}
