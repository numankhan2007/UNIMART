import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { ShieldCheck, Lock, Building2, Fingerprint, ArrowRight, CheckCircle2, Moon, Sun } from "lucide-react";

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

const TRUST_BADGES = [
  "✓ Verified",
  "✓ Secure",
  "✓ Campus Only",
];

const SOCIAL_LINKS = [
  {
    label: "Email",
    href: "mailto:contact@unimart.com",
    icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>,
  },
  {
    label: "Twitter",
    href: "#",
    icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  }
];

function TrustCard({ icon: Icon, title, desc, color, bg }) {
  return (
    <div className="bg-white/50 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] p-8 flex flex-col items-center text-center gap-4">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300"
        style={{ backgroundColor: bg }}
      >
        <Icon size={24} style={{ color }} />
      </div>
      <div>
        <h3 className="text-lg font-medium text-slate-700 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      {/* Theme Toggle Button */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-slate-200/50 dark:border-gray-700/50 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
          title="Toggle Theme"
        >
          {darkMode ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-indigo-500" />}
        </button>
      </div>
      <main className="flex-1 relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto px-6">
        
        <section className="w-full pt-32 pb-24 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-full text-sm font-medium text-slate-600 mb-8 shadow-sm">
            <ShieldCheck size={16} className="text-indigo-500" />
            Exclusive Marketplace
          </div>

          <h1 className="text-5xl sm:text-6xl font-semibold text-slate-800 leading-tight tracking-tight max-w-3xl">
            The Marketplace <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-500">
              Built on Trust
            </span>
          </h1>

          <p className="text-lg text-slate-500 mt-6 max-w-2xl leading-relaxed">
            Every buyer and seller is a verified student. 
            Trade essentials safely and privately on campus.
          </p>

          <div className="flex flex-wrap gap-4 mt-10 justify-center">
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-medium py-3.5 px-8 rounded-full text-base shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-200"
            >
              Start Trading
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => {
                document.getElementById('trust-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 bg-white/60 backdrop-blur-md text-slate-600 font-medium py-3.5 px-8 rounded-full text-base border border-slate-200/60 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
            >
              How It Works
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-12 justify-center">
            {TRUST_BADGES.map((badge, i) => (
              <span
                key={i}
                className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-white/50 border border-slate-100 text-slate-500 backdrop-blur-md shadow-sm"
              >
                {badge}
              </span>
            ))}
          </div>
        </section>

        <section id="trust-section" className="w-full py-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-semibold text-slate-800 tracking-tight">
              Why Students Trust UNIMART
            </h2>
            <p className="text-slate-500 mt-4 text-base">
              Designed with student safety as the foundation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {TRUST_FEATURES.map((feature, i) => (
              <TrustCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                desc={feature.desc}
                color={feature.color}
                bg={feature.bg}
              />
            ))}
          </div>
        </section>

        <section className="w-full py-20">
          <div className="bg-white/50 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-12 rounded-3xl text-center w-full">
            <h3 className="text-2xl font-semibold text-slate-800 tracking-tight mb-4">
              Join our verified students
            </h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              Safe, verified, and built for students.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-medium py-3.5 px-8 rounded-full text-base shadow-md hover:bg-indigo-700 transition-all duration-200"
            >
              Get Started
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

      </main>

      <footer className="relative z-10 border-t border-slate-100 bg-white/30 backdrop-blur-md w-full">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col items-center gap-6">
          <div className="flex gap-4 justify-center">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                className="w-10 h-10 rounded-full bg-white border border-slate-200/50 flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:border-indigo-100 shadow-sm hover:shadow transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
          <p className="text-xs text-slate-400 font-medium tracking-wide">
            © 2026 UNIMART.
          </p>
        </div>
      </footer>

    </div>
  );
}
