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
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        trust: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        /* ─── Consolidated tokens (reference CSS variables) ─── */
        brand: {
          DEFAULT: 'var(--color-brand)',
          strong: 'var(--color-brand-strong)',
          soft: 'var(--color-brand-soft)',
        },
        verified: {
          DEFAULT: 'var(--color-verified)',
          soft: 'var(--color-verified-soft)',
        },
        ink: {
          DEFAULT: 'var(--color-ink)',
          soft: 'var(--color-ink-soft)',
          muted: 'var(--color-ink-muted)',
        },
        canvas: 'var(--color-canvas)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          soft: 'var(--color-surface-soft)',
        },
        'border-token': {
          DEFAULT: 'var(--color-border)',
          soft: 'var(--color-border-soft)',
        },
        /* Keep primary scale for components that use primary-50..950 */
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4f46e5, #6366f1, #818cf8)',
        'gradient-subtle': 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #f0e7ff 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(99,102,241,0.05), rgba(168,85,247,0.05), rgba(236,72,153,0.03))',
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))',
      },
      boxShadow: {
        'sm-token': 'var(--shadow-sm)',
        'md-token': 'var(--shadow-md)',
        'lg-token': 'var(--shadow-lg)',
        'card': 'var(--shadow-sm)',
        'card-hover': 'var(--shadow-lg)',
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
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up-fade': 'slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
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
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'fluid': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
