/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'display-hero': ['"Plus Jakarta Sans"', 'sans-serif'],
        'display-hero-mobile': ['"Plus Jakarta Sans"', 'sans-serif'],
        'headline-section': ['"Plus Jakarta Sans"', 'sans-serif'],
        'headline-card': ['Inter', 'sans-serif'],
        'body-large': ['Inter', 'sans-serif'],
        'body-base': ['Inter', 'sans-serif'],
        'label-caps': ['Inter', 'sans-serif'],
        'button-text': ['Inter', 'sans-serif'],
      },
      colors: {
        /* ─── Stitch "Unimart Academic Elite" palette ─── */
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',   /* Stitch primary-container */
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        surface: {
          DEFAULT: '#f8f9ff',  /* Stitch surface */
          dim: '#cbdbf5',
          bright: '#f8f9ff',
          container: {
            lowest: '#ffffff',
            low: '#eff4ff',
            DEFAULT: '#e5eeff',
            high: '#dce9ff',
            highest: '#d3e4fe',
          },
        },
        accent: {
          purple: '#a855f7',
          pink: '#ec4899',
          cyan: '#06b6d4',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
        },
        'surface-white': '#FFFFFF',
        'surface-soft': '#F4F6FB',
        'text-primary': '#0B1C30',
        'text-secondary': '#566074',
        'primary-container': '#4f46e5',
        'border-standard': '#E2E8F0',
        'success-emerald': '#10B981',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4f46e5, #6366f1, #818cf8)',
        'gradient-subtle': 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #f0e7ff 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(99,102,241,0.05), rgba(168,85,247,0.05), rgba(236,72,153,0.03))',
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))',
      },
      boxShadow: {
        'glass': '0 4px 20px rgba(0, 0, 0, 0.04)',
        'glass-lg': '0 8px 40px rgba(0, 0, 0, 0.06)',
        'glass-xl': '0 12px 60px rgba(0, 0, 0, 0.08)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 20px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 8px 40px rgba(79, 70, 229, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
        'float': '0 8px 30px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
        'float-lg': '0 16px 48px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05)',
        'button': '0 2px 8px rgba(79, 70, 229, 0.25)',
        'button-hover': '0 4px 16px rgba(79, 70, 229, 0.35)',
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.03)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'gradient': 'gradient 6s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up-fade': 'slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'spring-in': 'springIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUpFade: {
          '0%': { transform: 'translateY(24px)', opacity: '0', filter: 'blur(4px)' },
          '100%': { transform: 'translateY(0)', opacity: '1', filter: 'blur(0)' },
        },
        springIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '60%': { transform: 'scale(1.02)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'beam-right': { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(250%)' } },
        'beam-left': { '0%': { transform: 'translateX(250%)' }, '100%': { transform: 'translateX(-100%)' } },
        'beam-down': { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(250%)' } },
        'beam-up': { '0%': { transform: 'translateY(250%)' }, '100%': { transform: 'translateY(-100%)' } },
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '64px',
      },
      aspectRatio: {
        'video': '16 / 9',
        '3/4': '3 / 4',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'fluid': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
