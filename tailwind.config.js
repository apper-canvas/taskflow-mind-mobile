/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B21B6',
        secondary: '#7C3AED',
        accent: '#F59E0B',
        surface: '#F3F4F6',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        purple: {
          600: '#7C3AED',
          700: '#5B21B6',
          800: '#4C1D95'
        },
        amber: {
          500: '#F59E0B'
        }
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      },
      animation: {
        'completion-burst': 'completion-burst 0.6s ease-out',
        'task-slide-in': 'task-slide-in 0.3s ease-out'
      },
      keyframes: {
        'completion-burst': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
          '100%': { transform: 'scale(0.95)', opacity: '0.6' }
        },
        'task-slide-in': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      scale: {
        '102': '1.02'
      }
    },
  },
  plugins: [],
}