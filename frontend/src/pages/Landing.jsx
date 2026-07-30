import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { ShieldCheck, Lock, Building2, Fingerprint, ArrowRight, Moon, Sun, ShoppingBag, BookOpen, Users, Zap, CheckCircle2 } from "lucide-react";
import VerifiedSeal from "../components/common/VerifiedSeal";

const TRUST_FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verified Students",
    desc: "Only registered college students can access the platform. Every user is a verified peer.",
    color: "var(--color-primary)",
    bg: "var(--color-primary-soft)",
  },
  {
    icon: Lock,
    title: "Secure Deliveries",
    desc: "Physical OTP handshake guarantees item inspection and safety before transactions complete.",
    color: "var(--color-success)",
    bg: "#EAF0E7",
  },
  {
    icon: Building2,
    title: "Campus Hub",
    desc: "Textbooks, electronics, and lab supplies traded securely within university library or dorm spaces.",
    color: "var(--color-verified)",
    bg: "var(--color-verified-soft)",
  },
  {
    icon: Fingerprint,
    title: "Closed Ecosystem",
    desc: "An invited educational marketplace with zero anonymous actors. Safety by architectural design.",
    color: "var(--color-ink)",
    bg: "var(--color-surface-soft)",
  },
];

const STATS = [
  { label: "Active Students", value: "1K+", icon: Users, color: "var(--color-primary)" },
  { label: "Quick Deals", value: "24h", icon: Zap, color: "var(--color-success)" },
  { label: "Categories", value: "8+", icon: BookOpen, color: "var(--color-verified)" },
  { label: "OTP Secured", value: "100%", icon: Lock, color: "var(--color-ink)" },
];

export default function Landing() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-[var(--color-canvas)] text-[var(--color-ink)] transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="p-3 card !rounded-full !p-2.5 hover:!transform-none shadow-soft-sm hover:shadow-soft-md transition-all"
          title="Toggle Theme"
        >
          {darkMode ? <Sun size={20} className="text-[var(--color-verified)]" /> : <Moon size={20} className="text-[var(--color-primary)]" />}
        </button>
      </div>

      <main className="flex-1 relative z-10 flex flex-col items-center w-full max-w-6xl mx-auto px-4 sm:px-6">

        {/* ═══ HERO SECTION ═══ */}
        <section className="w-full pt-24 sm:pt-32 pb-16">
          <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.25rem' }}>

            {/* Main Hero Cell */}
            <div className="card col-span-12 lg:col-span-8 flex flex-col justify-center items-center lg:items-start text-center lg:text-left py-12 sm:py-16 px-6 sm:px-10 hover:!transform-none bento-animate shadow-soft-md">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary-soft)] border border-[var(--color-border)] mb-6 shadow-soft-sm">
                <ShieldCheck size={16} />
                <span>University-Exclusive Marketplace</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-ink)] leading-[1.12] tracking-tight max-w-2xl">
                Buy & Sell with{' '}
                <span className="text-[var(--color-primary)] font-extrabold">Campus Peers</span>
              </h1>

              <p className="text-base sm:text-lg text-[var(--color-ink-soft)] mt-5 max-w-xl leading-relaxed">
                Verified students. Secure physical OTP meetups. The premium Soft UI Evolution marketplace built exclusively for your university campus.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <button
                  onClick={() => navigate("/login")}
                  className="btn-primary !rounded-[var(--radius-md)] !py-3.5 !px-8 text-base shadow-soft-sm hover:shadow-soft-md"
                >
                  <span>Start Trading</span>
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => document.getElementById('trust-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-secondary !rounded-[var(--radius-md)] !py-3.5 !px-8 text-base"
                >
                  <span>How It Works</span>
                </button>
              </div>
            </div>

            {/* Stats side cells */}
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="card col-span-6 lg:col-span-2 flex flex-col items-center justify-center text-center p-6 bento-animate shadow-soft-sm"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <div
                  className="w-12 h-12 rounded-[var(--radius-md)] flex items-center justify-center mb-3 shadow-soft-sm bg-[var(--color-surface-soft)]"
                >
                  <stat.icon size={22} style={{ color: stat.color }} />
                </div>
                <div className="font-display text-2xl font-bold text-[var(--color-ink)]">{stat.value}</div>
                <div className="text-xs text-[var(--color-ink-soft)] mt-0.5 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ TRUST SECTION ═══ */}
        <section id="trust-section" className="w-full py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center mb-4">
              <VerifiedSeal size={56} />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-ink)] tracking-tight">
              Why Students Trust UNIMART
            </h2>
            <p className="text-[var(--color-ink-soft)] mt-3 text-base leading-relaxed">
              Designed with institutional security and student privacy as the foundation.
            </p>
          </div>

          <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.25rem' }}>
            {TRUST_FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              const isLarge = i === 0;
              return (
                <div
                  key={feature.title}
                  className={`card ${isLarge ? 'col-span-12 md:col-span-6' : 'col-span-12 sm:col-span-6 md:col-span-3'} flex flex-col items-center text-center gap-4 py-8 px-6 bento-animate shadow-soft-sm hover:shadow-soft-md`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div
                    className="w-14 h-14 rounded-[var(--radius-lg)] flex items-center justify-center shadow-soft-sm"
                    style={{ backgroundColor: feature.bg }}
                  >
                    <Icon size={24} style={{ color: feature.color }} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[var(--color-ink)] mb-2">{feature.title}</h3>
                    <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ CTA SECTION ═══ */}
        <section className="w-full py-16">
          <div className="card !bg-gradient-to-br !from-[var(--color-surface)] !to-[var(--color-surface-soft)] text-center py-14 px-8 bento-animate shadow-soft-lg hover:!transform-none border-2 border-[var(--color-border)]">
            <div className="flex justify-center mb-3">
              <CheckCircle2 size={32} style={{ color: 'var(--color-verified)', fill: 'var(--color-verified-soft)' }} />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-ink)] tracking-tight mb-3">
              Join our verified student marketplace
            </h3>
            <p className="text-sm sm:text-base text-[var(--color-ink-soft)] mb-8 max-w-md mx-auto leading-relaxed">
              Safe, verified, and built exclusively for university students like you.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="btn-primary !rounded-[var(--radius-md)] !py-3.5 !px-8 text-base shadow-soft-md hover:shadow-soft-lg transition-all"
            >
              <span>Get Started Now</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[var(--color-border)] w-full bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 gradient-bg rounded-[var(--radius-md)] flex items-center justify-center shadow-soft-sm">
              <ShoppingBag size={16} className="text-white" />
            </div>
            <span className="text-lg font-display font-bold text-[var(--color-primary)] tracking-tight">UNIMART</span>
          </div>
          <p className="text-xs text-[var(--color-ink-soft)] font-medium tracking-wide">
            © 2026 UNIMART. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

