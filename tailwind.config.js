/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          950: '#1a0b2e',
          900: '#2d1b69',
          800: '#3730a3',
          700: '#4c1d95',
          600: '#7c3aed',
          500: '#8b5cf6',
          400: '#a78bfa',
          300: '#c4b5fd',
          200: '#ddd6fe',
          100: '#ede9fe',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'vinyl-spin': 'spin 3s linear infinite',
        'cd-spin': 'spin 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          from: { boxShadow: '0 0 20px #8b5cf6' },
          to: { boxShadow: '0 0 30px #c4b5fd, 0 0 40px #8b5cf6' },
        }
      }
    },
  },
  plugins: [],
}

