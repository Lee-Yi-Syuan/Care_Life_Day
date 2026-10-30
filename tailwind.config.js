/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['AppFont', '"PingFang TC"', '"Microsoft JhengHei"', 'system-ui', 'sans-serif'],
        display: ['AppFont', '"PingFang TC"', '"Microsoft JhengHei"', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#fffdf3',
          100: '#fff9e0',
          200: '#fff1bf',
          300: '#ffe591',
        },
        carrot: {
          300: '#bfdbfe',
          400: '#60a5fa',
          500: '#2563eb',
          600: '#1e4fc0',
        },
        grass: {
          400: '#ffe066',
          500: '#ffc91f',
          600: '#a86400',
        },
        earth: {
          500: '#4a6a94',
          700: '#1e3a5f',
          900: '#14284a',
        },
        paw: {
          pink: '#fde68a',
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
          '40%': { transform: 'scale(1.35)', color: '#1e4fc0' },
        },
        confettiFade: {
          '0%': { transform: 'translateY(0) rotate(0)', opacity: '1' },
          '100%': { transform: 'translateY(180px) rotate(360deg)', opacity: '0' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(37,99,235,0.0)' },
          '50%': { boxShadow: '0 0 28px 6px rgba(37,99,235,0.5)' },
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
