/**
 * UNIMART Landing — Premium Liquid Glass
 * Stitch Design System: Unimart Academic Elite
 *
 * - Clean white background with subtle gradient accents
 * - Floating glass navbar
 * - Hero with product collage illustration
 * - Trust section "Why Students Trust UNIMART"
 * - Social footer
 */

import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, Building2, Fingerprint, ArrowRight, CheckCircle2 } from "lucide-react";
import "./landing.css";

/* ─── Trust Features ─── */
const TRUST_FEATURES = [
 {
 icon: ShieldCheck,
 title: "Verified Students Only",
 desc: "Only students in the official university registry can register. Every buyer and seller is a confirmed peer.",
 color: "#4f46e5",
 bg: "#eef2ff",
 },
 {
 icon: Lock,
 title: "OTP-Secured Deliveries",
 desc: "Every delivery uses a physical OTP handshake. The buyer confirms receipt before the transaction completes.",
 color: "#10b981",
 bg: "#ecfdf5",
 },
 {
 icon: Building2,
 title: "Campus Marketplace",
 desc: "Textbooks, electronics, lab equipment, and notes — everything you need for university life, traded on campus.",
 color: "#7c3aed",
 bg: "#f5f3ff",
 },
 {
 icon: Fingerprint,
 title: "Trust-First Ecosystem",
 desc: "A closed, invite-only marketplace. No anonymous sellers. No unverified buyers. Safety by design.",
 color: "#f59e0b",
 bg: "#fffbeb",
 },
];

const TRUST_BADGES = [
 "✓ .edu Verified",
 "✓ OTP-Secured",
 "✓ 1,250+ Students",
 "✓ Campus Only",
];

const SOCIAL_LINKS = [
 {
 label: "Telegram",
 href: "https://t.me/your_channel",
 icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.88 13.376l-2.967-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.183z"/></svg>,
 },
 {
 label: "Email",
 href: "mailto:unimart@yourdomain.com",
 icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>,
 },
 {
 label: "YouTube",
 href: "https://youtube.com/@yourchannel",
 icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
 },
 {
 label: "Facebook",
 href: "https://facebook.com/yourpage",
 icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
 },
 {
 label: "Twitter",
 href: "https://twitter.com/yourhandle",
 icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
 },
 {
 label: "GitLab",
 href: "https://gitlab.com/yourgroup",
 icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/></svg>,
 },
];


/* ─── Floating Product Cards Illustration ─── */
function ProductCollage() {
 return (
 <div className="relative w-full max-w-lg mx-auto" style={{ height: 380 }}>
 {/* Background glow */}
 <div className="absolute inset-0 rounded-full bg-primary-100/40 blur-3xl" style={{ transform: 'scale(0.7)' }} />

 {/* Card 1 — Textbook */}
 <div
 className="absolute bg-white/60 backdrop-blur-xl border border-gray-200/50 shadow-sm rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10 p-4 w-52"
 style={{
 top: '10%', left: '5%',
 animation: 'lnd-float 6s ease-in-out infinite',
 animationDelay: '0s',
 }}
 >
 <div className="w-full h-28 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl flex items-center justify-center text-4xl mb-3">
 📚
 </div>
 <p className="text-sm font-semibold text-gray-900 ">Engineering Textbook</p>
 <p className="text-xs text-gray-500 mt-0.5">3rd Semester</p>
 <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-primary-50 text-primary-600 ">
 ₹250
 </div>
 </div>

 {/* Card 2 — Electronics */}
 <div
 className="absolute bg-white/60 backdrop-blur-xl border border-gray-200/50 shadow-sm rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10 p-4 w-48"
 style={{
 top: '25%', right: '0%',
 animation: 'lnd-float 6s ease-in-out infinite',
 animationDelay: '1s',
 }}
 >
 <div className="w-full h-24 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center text-4xl mb-3">
 💻
 </div>
 <p className="text-sm font-semibold text-gray-900 ">Scientific Calculator</p>
 <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 ">
 Free
 </div>
 </div>

 {/* Card 3 — Lab equipment */}
 <div
 className="absolute bg-white/60 backdrop-blur-xl border border-gray-200/50 shadow-sm rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10 p-4 w-44"
 style={{
 bottom: '5%', left: '15%',
 animation: 'lnd-float 6s ease-in-out infinite',
 animationDelay: '2s',
 }}
 >
 <div className="w-full h-20 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl flex items-center justify-center text-3xl mb-3">
 🔬
 </div>
 <p className="text-sm font-semibold text-gray-900 ">Lab Kit</p>
 <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-primary-50 text-primary-600 ">
 ₹180
 </div>
 </div>

 {/* Verified badge floating */}
 <div
 className="absolute bg-white/60 backdrop-blur-xl border border-gray-200/50 shadow-sm rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10 px-3 py-2 flex items-center gap-2"
 style={{
 bottom: '30%', right: '5%',
 animation: 'lnd-float 6s ease-in-out infinite',
 animationDelay: '3s',
 }}
 >
 <CheckCircle2 size={16} className="text-emerald-500" />
 <span className="text-xs font-semibold text-gray-700 ">Verified Seller</span>
 </div>
 </div>
 );
}


/* ─── Trust Feature Card ─── */
function TrustCard({ icon: Icon, title, desc, color, bg, delay = "0s" }) {
 return (
 <div
 className="bg-white/60 backdrop-blur-xl border border-gray-200/50 shadow-sm rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10 p-6 flex flex-col gap-4 group"
 style={{ animation: `lnd-card-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay} both` }}
 >
 <div
 className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
 style={{ backgroundColor: bg }}
 >
 <Icon size={22} style={{ color }} />
 </div>
 <div>
 <h3 className="text-base font-semibold text-gray-900 mb-1.5">{title}</h3>
 <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
 </div>
 </div>
 );
}


/* ─── MAIN LANDING ─── */
export default function Landing() {
 const navigate = useNavigate();

 return (
 <div className="min-h-screen bg-white">
 {/* ═══ HERO SECTION ═══ */}
 <section className="relative overflow-hidden">
 {/* Subtle gradient orbs */}
 <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-200/30 rounded-full blur-3xl" />
 <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-200/20 rounded-full blur-3xl" />

 <div className="relative section-padding pt-32 sm:pt-40 pb-16 lg:pb-24">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
 {/* Left — Copy */}
 <div className="text-center lg:text-left" style={{ animation: 'lnd-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
 <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-full text-sm font-medium text-primary-700 mb-6">
 <ShieldCheck size={15} />
 Student-Only Marketplace
 </div>

 <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-gray-900 leading-[1.1] tracking-tight">
 The Campus Marketplace{" "}
 <span className="gradient-text">Built on Trust</span>
 </h1>

 <p className="text-lg text-gray-500 mt-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
 Every buyer and seller is a verified student from your university.
 Trade textbooks, electronics, and more — safely and privately.
 </p>

 {/* CTAs */}
 <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
 <button
 onClick={() => navigate("/login")}
 className="btn-primary !py-3 !px-7 !rounded-full text-base group"
 >
 Start Trading
 <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
 </button>
 <button
 onClick={() => {
 document.getElementById('trust-section')?.scrollIntoView({ behavior: 'smooth' });
 }}
 className="inline-flex items-center justify-center gap-2 bg-[#f8f9ff] text-[#464555] font-semibold !py-3 !px-7 !rounded-full text-base border border-[#e2e8f0] hover:bg-[#eef2ff] hover:border-[#c7d2fe] transition-all duration-200"
 >
 How It Works
 </button>
 </div>

 {/* Trust Badge Pills */}
 <div className="flex flex-wrap gap-2 mt-8 justify-center lg:justify-start" style={{ animation: 'lnd-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both' }}>
 {TRUST_BADGES.map((badge, i) => (
 <span
 key={i}
 className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/80 border border-gray-200/60 text-gray-600 backdrop-blur-sm"
 >
 {badge}
 </span>
 ))}
 </div>
 </div>

 {/* Right — Product Collage */}
 <div className="hidden lg:block" style={{ animation: 'lnd-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' }}>
 <ProductCollage />
 </div>
 </div>
 </div>
 </section>


 {/* ═══ TRUST SECTION ═══ */}
 <section id="trust-section" className="section-padding py-20 lg:py-28">
 <div className="text-center max-w-2xl mx-auto mb-14" style={{ animation: 'lnd-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
 <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary-50 text-primary-600 mb-4">
 Trust & Safety
 </span>
 <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
 Why Students Trust <span className="gradient-text">UNIMART</span>
 </h2>
 <p className="text-gray-500 mt-4 text-lg">
 Built from the ground up with student safety as the foundation. Every feature is designed to protect you.
 </p>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
 {TRUST_FEATURES.map((feature, i) => (
 <TrustCard
 key={feature.title}
 icon={feature.icon}
 title={feature.title}
 desc={feature.desc}
 color={feature.color}
 bg={feature.bg}
 delay={`${0.1 + i * 0.1}s`}
 />
 ))}
 </div>
 </section>


 {/* ═══ SOCIAL PROOF SECTION ═══ */}
 <section className="section-padding pb-16">
 <div
 className="bg-white/60 backdrop-blur-xl border border-gray-200/50 shadow-sm rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10 p-8 sm:p-12 text-center"
 style={{ animation: 'lnd-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both' }}
 >
 <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-3">
 Join <span className="gradient-text">1,250+</span> verified students
 </h3>
 <p className="text-gray-500 mb-8 max-w-md mx-auto">
 Already trading on campus. Safe, verified, and built for students.
 </p>
 <button
 onClick={() => navigate("/register")}
 className="btn-primary !py-3.5 !px-8 !rounded-full text-base group"
 >
 Get Started Free
 <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
 </button>
 </div>
 </section>


 {/* ═══ FOOTER ═══ */}
 <footer className="border-t border-gray-100 ">
 <div className="section-padding py-10">
 <div className="flex flex-col items-center gap-6">
 {/* Social Links */}
 <div className="flex gap-2.5 flex-wrap justify-center">
 {SOCIAL_LINKS.map(({ label, href, icon }, i) => (
 <a
 key={label}
 href={href}
 target="_blank"
 rel="noopener noreferrer"
 title={label}
 className="w-10 h-10 rounded-xl bg-white border border-gray-200/60 flex items-center justify-center text-gray-400 hover:text-primary-600 hover:border-primary-200 transition-all duration-200 hover:scale-105"
 style={{ animation: `lnd-social-in 0.4s cubic-bezier(0.34,1.56,0.64,1) ${0.5+i*0.06}s both` }}
 >
 {icon}
 </a>
 ))}
 </div>

 <p className="text-xs text-gray-400 tracking-wide">
 © 2026 UNIMART. ALL RIGHTS RESERVED.
 </p>
 </div>
 </div>
 </footer>
 </div>
 );
}
