import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative p-2 rounded-xl transition-all duration-300 btn-animated
        hover:bg-gray-100 dark:hover:bg-gray-800
        text-gray-600 dark:text-gray-400
        ${className}
      `}
      aria-label="Toggle theme"
    >
      <div
        className="theme-icon"
        style={{ transform: darkMode ? 'rotate(180deg)' : 'rotate(0deg)' }}
      >
        {darkMode ? (
          <Moon size={20} className="text-primary-400" />
        ) : (
          <Sun size={20} className="text-amber-500" />
        )}
      </div>
    </button>
  );
}
