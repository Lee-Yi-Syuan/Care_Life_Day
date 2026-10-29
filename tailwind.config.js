/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans TC"', '"PingFang TC"', '"Microsoft JhengHei"', 'system-ui', 'sans-serif'],
        display: ['"Zcool KuaiLe"', '"Noto Sans TC"', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#fffdf5',
          100: '#fdf6e3',
          200: '#f8ecd0',
          300: '#f0dca8',
        },
        carrot: {
          400: '#f4924d',
          500: '#ed7d2b',
          600: '#d9641a',
        },
        grass: {
          400: '#7cb342',
          500: '#5d9e3a',
          600: '#4a7e2c',
        },
        earth: {
          500: '#8d6e4f',
          700: '#5d4a33',
          900: '#3a2d1f',
        },
        paw: {
          pink: '#f4b8c0',
        },
      },
      animation: {
        'pop-in': 'popIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
        'count-bump': 'countBump 0.45s ease-out',
        'confetti-fade': 'confettiFade 1.2s ease-out forwards',
        'glow-pulse': 'glowPulse 1.4s ease-in-out infinite',
        'float-y': 'floatY 3s ease-in-out infinite',
      },
      keyframes: {
        popIn: {
          '0%': { transform: 'scale(0.6) translateY(20px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        countBump: {
          '0%,100%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.35)', color: '#ed7d2b' },
        },
        confettiFade: {
          '0%': { transform: 'translateY(0) rotate(0)', opacity: '1' },
          '100%': { transform: 'translateY(180px) rotate(360deg)', opacity: '0' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(237,125,43,0.0)' },
          '50%': { boxShadow: '0 0 28px 6px rgba(237,125,43,0.55)' },
        },
        floatY: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
