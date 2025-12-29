/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6D9DFF',
          DEFAULT: '#4285F4',
          dark: '#2A66CC',
        },
        secondary: {
          light: '#FFD166',
          DEFAULT: '#FFC107',
          dark: '#E6A200',
        },
        neutral: {
          50: '#F8F9FA',
          100: '#F1F3F5',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6C757D',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        },
        danger: {
          light: '#F88073',
          DEFAULT: '#EA4335',
          dark: '#C53929',
        },
        success: {
          light: '#5EE08D',
          DEFAULT: '#34A853',
          dark: '#2A8744',
        },
        warning: {
          light: '#FFD166',
          DEFAULT: '#FFC107',
          dark: '##E6A200',
        },
      },
      backgroundImage: {
        'multi-gold':
          'linear-gradient(to right, #fad2a4 0%, #f6cda0 3%, #ca9674 35%, #aa6e55 63%, #965641 85%, #8f4d3a 98%)',
      },
    },
    fontSize: {
      'xs': ['0.75rem', { lineHeight: '1rem' }],
      'sm': ['0.875rem', { lineHeight: '1.25rem' }],
      'base': ['1rem', { lineHeight: '1.5rem' }],
      'lg': ['1.125rem', { lineHeight: '1.75rem' }],
      'xl': ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    },
  },
  plugins: [],
};
