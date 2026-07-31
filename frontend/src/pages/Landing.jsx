import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { ShieldCheck, Lock, Building2, Fingerprint, ArrowRight, Moon, Sun, ShoppingBag, BookOpen, Zap, Users } from "lucide-react";
import VerifiedSeal from "../components/common/VerifiedSeal";

const TRUST_FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verified students only",
    desc: "Every account is matched against your university's official registry before it can trade.",
  },
  {
    icon: Lock,
    title: "OTP-secured handoff",
    desc: "Deliveries confirm with a one-time code exchanged in person — no payment released without it.",
  },
  {
    icon: Building2,
    title: "Built for one campus",
    desc: "Textbooks, electronics, and essentials, traded only within your own university community.",
  },
  {
    icon: Fingerprint,
    title: "No anonymous accounts",
    desc: "Invite-only by design. Every buyer and seller is a real, confirmed peer — never a stranger.",
  },
];

const STATS = [
  { label: "Active students", value: "1,000+", icon: Users },
  { label: "Avg. time to sell", value: "24 hrs", icon: Zap },
  { label: "Categories", value: "8+", icon: BookOpen },
  { label: "Registry-verified", value: "100%", icon: ShieldCheck },
];

export default function Landing() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col relative" style={{ background: "var(--color-canvas)" }}>
      {/* Theme toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full transition-colors"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}
          title="Toggle theme"
        >
          {darkMode ? <Sun size={18} style={{ color: "var(--color-verified)" }} /> : <Moon size={18} style={{ color: "var(--color-brand)" }} />}
        </button>
      </div>

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 sm:px-8">

        {/* ═══ HERO — centered layout with prominent typography ═══ */}
        <section className="w-full pt-28 sm:pt-36 pb-20 flex flex-col items-center text-center">
          <div
            className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 shadow-sm-token"
            style={{ color: "var(--color-brand)", background: "var(--color-brand-soft)", border: "1px solid rgba(122,31,43,0.18)" }}
          >
            <ShieldCheck size={15} />
            University-exclusive marketplace
          </div>

          <h2
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase mb-3"
            style={{
              background: "linear-gradient(135deg, var(--color-brand) 0%, #D83A56 50%, var(--color-brand-strong) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            UNIMART
          </h2>

          <h1
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight max-w-3xl mx-auto"
            style={{ color: "var(--color-ink)" }}
          >
            Buy and sell,{" "}
            <span style={{ color: "var(--color-brand)" }}>verified</span>.
          </h1>

          <p className="text-lg mt-6 max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
            Every listing on UNIMART is tied to a confirmed university register number, so you always know who you're dealing with.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-9">
            <button
              onClick={() => navigate("/login")}
              className="btn-primary text-base"
            >
              Start trading
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => document.getElementById("trust-section")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-secondary text-base"
            >
              How it works
            </button>
          </div>

          {/* Stat ledger strip — centered cells */}
          <div
            className="mt-16 w-full grid grid-cols-2 sm:grid-cols-4 rounded-[var(--radius-lg)] overflow-hidden"
            style={{ border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center text-center gap-1.5 px-5 py-6"
                style={{
                  background: "var(--color-surface)",
                  borderRight: i % 2 === 0 && i !== STATS.length - 1 ? "1px solid var(--color-border-soft)" : undefined,
                  borderTop: i >= 2 ? "1px solid var(--color-border-soft)" : undefined,
                }}
              >
                <stat.icon size={18} style={{ color: "var(--color-verified)" }} />
                <div className="font-data text-2xl font-bold" style={{ color: "var(--color-ink)" }}>{stat.value}</div>
                <div className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--color-ink-soft)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ TRUST — centered grid layout ═══ */}
        <section id="trust-section" className="w-full py-20" style={{ borderTop: "1px solid var(--color-border)" }}>
          <div className="max-w-2xl mx-auto text-center mb-12 pt-20 -mt-20 flex flex-col items-center">
            <VerifiedSeal size={48} label="Why students trust UNIMART" />
            <p className="mt-4 text-base" style={{ color: "var(--color-ink-soft)" }}>
              Designed with student safety as the foundation, not an afterthought.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TRUST_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex flex-col items-center text-center p-8 rounded-[var(--radius-lg)] transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mb-4"
                    style={{ background: "var(--color-surface-soft)", border: "1px solid var(--color-border)" }}
                  >
                    <Icon size={22} style={{ color: "var(--color-brand)" }} />
                  </div>
                  <h3 className="text-lg font-bold font-display" style={{ color: "var(--color-ink)" }}>{feature.title}</h3>
                  <p className="text-sm mt-2 leading-relaxed max-w-xs" style={{ color: "var(--color-ink-soft)" }}>{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ CTA — centered card centerpiece ═══ */}
        <section className="w-full py-20">
          <div
            className="max-w-4xl mx-auto text-center py-16 px-8 sm:px-12 rounded-[var(--radius-lg)] transition-all"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)" }}
          >
            <h3 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--color-ink)" }}>
              Join your verified campus
            </h3>
            <p className="mb-8 max-w-md mx-auto text-base" style={{ color: "var(--color-ink-soft)" }}>
              Safe, verified, and built exclusively for students like you.
            </p>
            <div className="flex justify-center">
              <button onClick={() => navigate("/register")} className="btn-primary text-base">
                Get started
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full" style={{ borderTop: "1px solid var(--color-border-soft)" }}>
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col items-center justify-center text-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: "var(--color-brand)" }}>
              <ShoppingBag size={16} className="text-white" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight" style={{ color: "var(--color-ink)" }}>UNIMART</span>
          </div>
          <p className="text-xs font-medium tracking-wide" style={{ color: "var(--color-ink-muted)" }}>
            © 2026 UNIMART. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

