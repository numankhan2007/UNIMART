import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  ShoppingBag,
  Plus,
  Home,
  User,
  Package,
  ShoppingCart,
  History,
  HelpCircle,
  LogOut,
  Sun,
  Moon,
  ChevronDown,
  BadgeCheck,
  Tag,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { getInitials } from "../../utils/helpers";
import NotificationBell from "../common/NotificationBell";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setShowMobileMenu(false);
    setShowDropdown(false);
  }, [location.pathname]);

  // Auto-open mobile search if search param is present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("search") === "true" && window.innerWidth < 768) {
      setShowMobileMenu(true);
      // Short delay to allow animation/render
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    }
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/home?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { to: "/home", label: "Browse", icon: ShoppingBag },
    { to: "/sell", label: "List your item", icon: Plus },
    { to: "/orders", label: "Orders", icon: Package },
  ];

  const dropdownItems = [
    { label: "My Profile", icon: User, action: () => navigate("/dashboard") },
    {
      label: "My Products",
      icon: Tag,
      action: () => navigate("/dashboard?tab=products"),
    },
    { label: "My Orders", icon: Package, action: () => navigate("/orders") },
    {
      label: "Buy History",
      icon: ShoppingCart,
      action: () => navigate("/dashboard?tab=buy"),
    },
    {
      label: "Sell History",
      icon: History,
      action: () => navigate("/dashboard?tab=sell"),
    },
    { label: "Help Center", icon: HelpCircle, action: () => navigate("/help") },
  ];

  const isLinkActive = (link) => {
    if (link.exact) return location.pathname === link.to && !location.search;
    if (link.to.includes("?"))
      return location.pathname + location.search === link.to;
    return location.pathname === link.to;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40">
      {/* Floating glass container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3">
        <div
          className="flex items-center justify-between h-14 px-4 sm:px-6 rounded-2xl"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.03)',
          }}
        >
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 gradient-bg rounded-xl flex items-center justify-center shadow-button">
              <ShoppingBag size={17} className="text-white" />
            </div>
            <span className="text-lg font-bold gradient-text hidden sm:block tracking-tight">
              UNIMART
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          {isAuthenticated && (
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-md mx-6"
            >
              <div className="relative w-full">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/60 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/50 transition-all"
                  style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.04)' }}
                />
              </div>
            </form>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-1.5">
            {isAuthenticated ? (
              <>
                {/* Nav Links - Desktop */}
                <div className="hidden md:flex items-center gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200
                        ${
                          isLinkActive(link)
                            ? "gradient-bg text-white shadow-button"
                            : "text-gray-600 dark:text-gray-400 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                        }`}
                    >
                      <link.icon size={15} />
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Notification Bell */}
                <NotificationBell />

                {/* Mobile Search Toggle */}
                <button
                  onClick={() => {
                    setShowMobileMenu(!showMobileMenu);
                    if (!showMobileMenu) {
                      setTimeout(() => searchInputRef.current?.focus(), 300);
                    }
                  }}
                  className="md:hidden p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all"
                >
                  <Search size={20} />
                </button>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all"
                  >
                    <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                      {user?.profilePictureUrl ? (
                        <img
                          src={user.profilePictureUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getInitials(user?.username || "U")
                      )}
                    </div>
                    <span className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user?.username}
                      {user?.verified && (
                        <BadgeCheck size={15} className="text-primary-500" />
                      )}
                    </span>
                    <ChevronDown
                      size={13}
                      className={`hidden lg:block text-gray-400 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
                    />
                  </button>

                  {showDropdown && (
                    <div
                      className="absolute right-0 top-full mt-2 w-64 rounded-[var(--radius-lg)] overflow-hidden scale-in card !bg-[var(--color-surface)] !border-[var(--color-border)] !shadow-[var(--shadow-soft-lg)] !z-50"
                    >
                        {/* Profile Header */}
                        <div className="px-4 py-3 border-b border-gray-100/60 dark:border-white/[0.06] bg-gradient-to-r from-primary-50/50 to-purple-50/50 dark:from-primary-900/10 dark:to-purple-900/10">
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                              {user?.username}
                            </p>
                            {user?.verified && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-1.5 py-0.5 rounded-full">
                                <BadgeCheck size={11} />
                                Verified
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {user?.campus}
                          </p>
                          <p className="text-xs text-primary-600 dark:text-primary-400 font-mono mt-0.5">
                            {user?.studentId}
                          </p>
                        </div>

                        {/* Menu Items */}
                        <div className="py-1.5">
                          {dropdownItems.map((item, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setShowDropdown(false);
                                item.action();
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors"
                            >
                              <item.icon size={15} className="text-gray-400" />
                              {item.label}
                            </button>
                          ))}
                        </div>

                        {/* Theme Toggle */}
                        <div className="px-4 py-2 border-t border-gray-100/60 dark:border-white/[0.06]">
                          <button
                            onClick={toggleTheme}
                            className="w-full flex items-center gap-3 px-0 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            {darkMode ? (
                              <Sun size={15} className="text-amber-500" />
                            ) : (
                              <Moon size={15} className="text-primary-500" />
                            )}
                            {darkMode ? "Light Mode" : "Dark Mode"}
                          </button>
                        </div>

                        {/* Logout */}
                        <div className="px-4 py-2 border-t border-gray-100/60 dark:border-white/[0.06]">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-0 py-2 text-sm text-rose-600 dark:text-rose-400 hover:text-rose-700 transition-colors"
                          >
                            <LogOut size={15} />
                            Logout
                          </button>
                        </div>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all"
                >
                  {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all"
                >
                  {darkMode ? (
                    <Sun size={18} className="text-amber-500" />
                  ) : (
                    <Moon size={18} className="text-primary-500" />
                  )}
                </button>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm !py-2 !px-5 !rounded-xl"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && isAuthenticated && (
          <div
            className="md:hidden mt-2 rounded-[var(--radius-lg)] overflow-hidden fade-in card !bg-[var(--color-surface)] !border-[var(--color-border)] !shadow-[var(--shadow-soft-lg)] !z-50"
          >
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="p-3">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/60 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.04)' }}
                  />
                </div>
              </form>

              {/* Mobile Nav Links */}
              <div className="px-3 pb-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${
                        isLinkActive(link)
                          ? "gradient-bg text-white shadow-button"
                          : "text-gray-600 dark:text-gray-400 hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                      }`}
                  >
                    <link.icon size={17} />
                    {link.label}
                  </Link>
                ))}
              </div>
          </div>
        )}
      </div>
    </nav>
  );
}
