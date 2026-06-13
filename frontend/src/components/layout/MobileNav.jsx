import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusCircle, Package, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function MobileNav() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return null;

  const links = [
    { to: '/home', icon: Home, label: 'Home' },
    { to: '/home?search=true', icon: Search, label: 'Search' },
    { to: '/sell', icon: PlusCircle, label: 'Sell' },
    { to: '/orders', icon: Package, label: 'Orders' },
    { to: '/dashboard', icon: User, label: 'Profile' },
  ];

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-bottom"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid var(--glass-border)',
        boxShadow: '0 -2px 16px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div className="flex items-center justify-around py-2 px-2">
        {links.map((link) => {
          const isActive = location.pathname === link.to ||
            (link.to === '/home' && location.pathname === '/home' && !location.search);
          return (
            <Link
              key={link.label}
              to={link.to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200
                ${isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
            >
              <link.icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium">{link.label}</span>
              {/* Active dot indicator */}
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-primary-600 dark:bg-primary-400 -mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
