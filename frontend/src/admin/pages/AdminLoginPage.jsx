import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../AdminAuthContext";
import "./admin.css";

// Matrix rain effect on canvas
function MatrixRain({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 13;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*アイウエオカキクケコサシスセソ";

    const draw = () => {
      ctx.fillStyle = "rgba(0,5,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => { clearInterval(interval); window.removeEventListener("resize", handleResize); };
  }, [canvasRef]);
  return null;
}

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [bootLines, setBootLines] = useState([]);
  const canvasRef = useRef(null);

  const BOOT_SEQUENCE = [
    "> UNIMART SECURE SHELL v2.6.0",
    "> Initializing kernel modules...",
    "> Loading admin privileges...",
    "> Establishing encrypted channel...",
    "> Authentication gateway ONLINE",
    "> Awaiting credentials...",
  ];

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < BOOT_SEQUENCE.length) {
        setBootLines((prev) => [...prev, BOOT_SEQUENCE[i]]);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 220);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      setSuccess(true);
      setTimeout(() => navigate("/admin", { replace: true }), 600);
    } catch (err) {
      const msg = err.response?.data?.detail || "ACCESS DENIED — Invalid credentials";
      setError(msg);
      setShakeKey((k) => k + 1);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    background: "transparent",
    border: "1px solid #003d0c",
    borderRadius: "2px",
    color: "#00ff41",
    fontSize: 13,
    fontFamily: "'JetBrains Mono', monospace",
    outline: "none",
    boxSizing: "border-box",
    letterSpacing: "0.08em",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000500",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      {/* Scanlines */}
      <div className="admin-scanlines" />

      {/* Matrix canvas */}
      <canvas ref={canvasRef} className="admin-matrix-canvas" />
      <MatrixRain canvasRef={canvasRef} />

      {/* Grid */}
      <div className="admin-bg-grid" />

      {/* Red glow edge */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 120% 80% at 50% 110%, rgba(255,0,51,0.12) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      {/* Green center glow */}
      <div
        className="fade-in"
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,255,65,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          animationDuration: "2s",
        }}
      />

      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 440, padding: "0 24px" }}>

        {/* Boot sequence */}
        <div
          className="fade-in"
          style={{
            marginBottom: 24,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "#005c12",
            lineHeight: 1.7,
          }}
        >
          {bootLines.map((line, i) => (
            <div
              key={i}
              className="slide-in-left"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* UNIMART / ADMIN heading */}
        <div
          className="fade-in"
          style={{ marginBottom: 4, textAlign: "center", animationDelay: "0.3s" }}
        >
          <div
            className="admin-glitch admin-crt"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 42,
              fontWeight: 800,
              color: "#00ff41",
              letterSpacing: "0.25em",
              lineHeight: 1.1,
              textShadow: "0 0 20px rgba(0,255,65,0.8), 0 0 40px rgba(0,255,65,0.4)",
            }}
          >
            UNIMART
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 22,
              fontWeight: 700,
              color: "#ff0033",
              letterSpacing: "0.5em",
              textShadow: "0 0 12px rgba(255,0,51,0.8), 0 0 30px rgba(255,0,51,0.4)",
              marginTop: 2,
            }}
          >
            ADMIN
          </div>
        </div>

        <div
          className="fade-in"
          style={{
            textAlign: "center",
            marginBottom: 28,
            color: "#005c12",
            fontSize: 10,
            letterSpacing: "0.25em",
            animationDelay: "0.5s",
          }}
        >
          ── RESTRICTED ACCESS TERMINAL ──
        </div>

        {/* Card */}
        <div
          className="scale-in admin-neon-border"
          style={{
            background: "rgba(0,10,2,0.9)",
            border: "1px solid #003d0c",
            borderRadius: "4px",
            padding: 28,
            animationDelay: "0.5s",
          }}
        >
          {/* Icon text instead of lock emoji */}
          <div
            className="fade-in"
            style={{
              marginBottom: 20,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#00b32c",
              letterSpacing: "0.15em",
              borderLeft: "2px solid #00ff41",
              paddingLeft: 10,
              animationDelay: "0.7s",
            }}
          >
            <div>ROOT ACCESS MODULE</div>
            <div style={{ color: "#005c12", marginTop: 2 }}>CLEARANCE: LEVEL 5 — FULL SYSTEM CONTROL</div>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div
                key={shakeKey}
                className="shake"
                style={{
                  background: "rgba(255,0,51,0.08)",
                  border: "1px solid #ff0033",
                  borderRadius: "2px",
                  padding: "10px 14px",
                  marginBottom: 16,
                  color: "#ff0033",
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                  textShadow: "0 0 8px rgba(255,0,51,0.6)",
                  letterSpacing: "0.05em",
                }}
              >
                ⚠ {error}
              </div>
            )}

            <div
              className="slide-in-left"
              style={{ marginBottom: 16, animationDelay: "0.8s" }}
            >
              <label style={{
                display: "block",
                fontSize: 10,
                color: "#00b32c",
                marginBottom: 6,
                letterSpacing: "0.2em",
              }}>
                &gt; USERNAME_
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = "#00ff41"; e.target.style.boxShadow = "0 0 10px rgba(0,255,65,0.3)"; }}
                onBlur={(e) => { e.target.style.borderColor = "#003d0c"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            <div
              className="slide-in-left"
              style={{ marginBottom: 24, animationDelay: "0.9s" }}
            >
              <label style={{
                display: "block",
                fontSize: 10,
                color: "#00b32c",
                marginBottom: 6,
                letterSpacing: "0.2em",
              }}>
                &gt; PASSWORD_
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = "#00ff41"; e.target.style.boxShadow = "0 0 10px rgba(0,255,65,0.3)"; }}
                onBlur={(e) => { e.target.style.borderColor = "#003d0c"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            <div
              className="fade-in"
              style={{ animationDelay: "1.0s" }}
            >
              <button
                type="submit"
                disabled={loading}
                className="btn-animated"
                style={{
                  width: "100%",
                  padding: "12px",
                  background: success ? "rgba(0,255,65,0.15)" : loading ? "rgba(0,255,65,0.05)" : "rgba(0,255,65,0.1)",
                  border: `1px solid ${success ? "#00ff41" : loading ? "#003d0c" : "#00ff41"}`,
                  borderRadius: "2px",
                  color: success ? "#00ff41" : loading ? "#00b32c" : "#00ff41",
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: "'JetBrains Mono', monospace",
                  cursor: loading ? "not-allowed" : "pointer",
                  letterSpacing: "0.3em",
                  textShadow: success ? "0 0 12px rgba(0,255,65,0.8)" : "none",
                  transition: "all 0.3s",
                }}
              >
                {success ? "✓ ACCESS GRANTED" : loading ? "AUTHENTICATING..." : "[ AUTHENTICATE ]"}
              </button>
            </div>
          </form>
        </div>

        <div
          className="fade-in"
          style={{
            textAlign: "center",
            marginTop: 16,
            color: "#003d0c",
            fontSize: 10,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.12em",
            animationDelay: "1.4s",
          }}
        >
          ALL CONNECTIONS ENCRYPTED · ACTIONS LOGGED · UNIMART © 2026
        </div>
      </div>
    </div>
  );
}
