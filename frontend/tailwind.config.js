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
        sans: ['"Atkinson Hyperlegible"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Crimson Pro"', 'Georgia', 'serif'],
        trust: ['"Crimson Pro"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        /* ─── Consolidated tokens (reference CSS variables) ─── */
        /* Institutional burgundy scale — replaces indigo. 600/700 match --color-brand / --color-brand-strong */
        brand: {
          DEFAULT: 'var(--color-primary)',
          strong: 'var(--color-primary-strong)',
          soft: 'var(--color-primary-soft)',
        },
        primary: {
          50: '#FBF1F1',
          100: '#F5E6E4',
          200: '#E9CBC8',
          300: '#D8A29D',
          400: '#C17972',
          500: '#A34F49',
          600: '#7A1F2B',
          700: '#5C1620',
          800: '#451018',
          900: '#300B11',
          950: '#1F0709',
          DEFAULT: 'var(--color-primary)',
          strong: 'var(--color-primary-strong)',
          soft: 'var(--color-primary-soft)',
        },
        /* Antique gold — verification accent, used only for verified/trust states */
        gold: {
          50: '#FDF8EF',
          100: '#F7EFDD',
          400: '#D4A94D',
          500: '#B8873A',
          600: '#96692A',
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
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7A1F2B, #B8873A)',
        'gradient-subtle': 'linear-gradient(135deg, #F5E6E4 0%, #F7EFDD 100%)',
        'gradient-hero': 'linear-gradient(135deg, #2A1015 0%, #451018 50%, #5C1620 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(122,31,43,0.05), rgba(184,135,58,0.05), rgba(122,31,43,0.03))',
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))',
      },
      boxShadow: {
        'sm-token': 'var(--shadow-sm)',
        'md-token': 'var(--shadow-md)',
        'lg-token': 'var(--shadow-lg)',
        'soft-sm': 'var(--shadow-soft-sm)',
        'soft-md': 'var(--shadow-soft-md)',
        'soft-lg': 'var(--shadow-soft-lg)',
        'card': 'var(--shadow-soft-md)',
        'card-hover': 'var(--shadow-soft-lg)',
        'button': 'var(--shadow-soft-sm)',
        'button-hover': 'var(--shadow-soft-md)',
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
