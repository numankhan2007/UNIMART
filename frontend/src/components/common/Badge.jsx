const colorMap = {
  primary: 'bg-[var(--color-primary-soft)] text-[var(--color-primary)] border border-[var(--color-primary)]/20',
  indigo: 'bg-[var(--color-primary-soft)] text-[var(--color-primary)] border border-[var(--color-primary)]/20',
  purple: 'bg-[var(--color-primary-soft)] text-[var(--color-primary-strong)] border border-[var(--color-primary)]/20',
  fuchsia: 'bg-[var(--color-primary-soft)] text-[var(--color-primary)] border border-[var(--color-primary)]/20',
  verified: 'bg-[var(--color-verified-soft)] text-[var(--color-verified)] border border-[var(--color-verified)] shadow-sm-token font-semibold',
  success: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/25',
  emerald: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/25',
  teal: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/25',
  lime: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/25',
  warning: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/25',
  amber: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/25',
  orange: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/25',
  info: 'bg-[var(--color-info)]/10 text-[var(--color-info)] border border-[var(--color-info)]/25',
  blue: 'bg-[var(--color-info)]/10 text-[var(--color-info)] border border-[var(--color-info)]/25',
  cyan: 'bg-[var(--color-info)]/10 text-[var(--color-info)] border border-[var(--color-info)]/25',
  error: 'bg-[var(--color-error)]/10 text-[var(--color-error)] border border-[var(--color-error)]/25',
  rose: 'bg-[var(--color-error)]/10 text-[var(--color-error)] border border-[var(--color-error)]/25',
  neutral: 'bg-[var(--color-surface-soft)] text-[var(--color-ink-soft)] border border-[var(--color-border)]/60',
  gray: 'bg-[var(--color-surface-soft)] text-[var(--color-ink-soft)] border border-[var(--color-border)]/60',
  slate: 'bg-[var(--color-surface-soft)] text-[var(--color-ink-soft)] border border-[var(--color-border)]/60',
};

export default function Badge({ children, color = 'primary', className = '', dot = false, onClick }) {
  return (
    <span
      onClick={onClick}
      className={`
        inline-flex items-center justify-center font-medium px-2.5 py-1 text-xs rounded-full transition-all duration-200
        ${colorMap[color] || colorMap.primary}
        ${onClick ? 'cursor-pointer hover:opacity-80' : ''}
        ${className}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 bg-current`} />
      )}
      {children}
    </span>
  );
}
