import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { ShieldCheck, Lock, Building2, Fingerprint, ArrowRight, Moon, Sun, ShoppingBag, BookOpen, Smartphone, Users, Zap } from "lucide-react";

const TRUST_FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verified Students",
    desc: "Only registered students can participate. Every user is a confirmed peer.",
    color: "#6366f1",
    bg: "#eef2ff",
  },
  {
    icon: Lock,
    title: "Secure Deliveries",
    desc: "Physical OTP handshake ensures safety before any transaction completes.",
    color: "#10b981",
    bg: "#ecfdf5",
  },
  {
    icon: Building2,
    title: "Campus Hub",
    desc: "Textbooks, electronics, and essentials traded securely on campus.",
    color: "#8b5cf6",
    bg: "#f5f3ff",
  },
  {
    icon: Fingerprint,
    title: "Closed Ecosystem",
    desc: "Invite-only marketplace with no anonymous actors. Safety by design.",
    color: "#f59e0b",
    bg: "#fffbeb",
  },
];

const STATS = [
  { label: "Active Students", value: "1K+", icon: Users, color: "#6366f1" },
  { label: "Quick Deals", value: "24h", icon: Zap, color: "#10b981" },
  { label: "Categories", value: "8+", icon: BookOpen, color: "#8b5cf6" },
  { label: "Secure", value: "100%", icon: Lock, color: "#f59e0b" },
];

export default function Landing() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-[var(--bento-bg)]">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="p-3 bento-cell !rounded-full !p-2.5 hover:!transform-none"
          title="Toggle Theme"
        >
          {darkMode ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-indigo-500" />}
        </button>
      </div>

      <main className="flex-1 relative z-10 flex flex-col items-center w-full max-w-6xl mx-auto px-4 sm:px-6">

        {/* ═══ HERO BENTO GRID ═══ */}
        <section className="w-full pt-24 sm:pt-32 pb-16">
          <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '1rem' }}>

            {/* Main Hero Cell — spans 8 cols */}
            <div className="bento-cell bento-cell-accent col-span-12 lg:col-span-8 flex flex-col justify-center items-center lg:items-start text-center lg:text-left py-12 sm:py-16 px-6 sm:px-10 hover:!transform-none bento-animate">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-white/60 dark:bg-white/5 border border-indigo-100 dark:border-indigo-500/20 mb-6 backdrop-blur-sm">
                <ShieldCheck size={16} />
                University-Exclusive Marketplace
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight max-w-2xl" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                Buy & Sell with{' '}
                <span className="gradient-text">Campus Students</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mt-5 max-w-xl leading-relaxed">
                Verified students. Secure transactions. The premium marketplace designed exclusively for your university campus.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <button
                  onClick={() => navigate("/login")}
                  className="btn-primary !rounded-full !py-3.5 !px-8 text-base"
                >
                  Start Trading
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => document.getElementById('trust-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-secondary !rounded-full !py-3.5 !px-8 text-base"
                >
                  How It Works
                </button>
              </div>
            </div>

            {/* Stats side cells — 4 cols, 2x2 grid */}
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`bento-cell col-span-6 lg:col-span-2 flex flex-col items-center justify-center text-center py-6 bento-animate`}
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: stat.color + '15' }}
                >
                  <stat.icon size={22} style={{ color: stat.color }} />
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ TRUST BENTO SECTION ═══ */}
        <section id="trust-section" className="w-full py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              Why Students Trust UNIMART
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 text-base">
              Designed with student safety as the foundation.
            </p>
          </div>

          <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '1rem' }}>
            {TRUST_FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              // First card is large, rest are regular
              const isLarge = i === 0;
              return (
                <div
                  key={feature.title}
                  className={`bento-cell ${isLarge ? 'col-span-12 md:col-span-6' : 'col-span-12 sm:col-span-6 md:col-span-3'} flex flex-col items-center text-center gap-4 py-8 px-6 bento-animate`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: feature.bg }}
                  >
                    <Icon size={24} style={{ color: feature.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ CTA BENTO CELL ═══ */}
        <section className="w-full py-16">
          <div className="bento-cell bento-cell-accent text-center py-14 px-8 bento-animate hover:!transform-none">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              Join our verified students
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
              Safe, verified, and built exclusively for students like you.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="btn-primary !rounded-full !py-3.5 !px-8 text-base"
            >
              Get Started
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[var(--bento-border-soft)] w-full">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 gradient-bg rounded-xl flex items-center justify-center">
              <ShoppingBag size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold gradient-text tracking-tight">UNIMART</span>
          </div>
          <p className="text-xs text-slate-400 font-medium tracking-wide">
            © 2026 UNIMART. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
