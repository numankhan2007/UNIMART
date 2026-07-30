const colorMap = {
  indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  rose: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  gray: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  // previously missing — categories fell back to indigo:
  teal: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  slate: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300',
  lime: 'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300',
  fuchsia: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300',
};

export default function Badge({ children, color = 'indigo', className = '', dot = false }) {
  return (
    <span
      className={`
        badge ${colorMap[color] || colorMap.indigo}
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
