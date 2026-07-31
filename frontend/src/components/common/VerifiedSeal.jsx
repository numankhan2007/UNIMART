import React from 'react';
import { ShieldCheck } from "lucide-react";

/**
 * VerifiedSeal — the app's signature trust element.
 * Gold + soft elevation are reserved for verification moments only
 * (profile badges, registry match confirmation, order handoff).
 * Do not reuse this color/shape for decoration elsewhere.
 */
export default function VerifiedSeal({ size = 48, label, className = "" }) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div
        className="flex items-center justify-center rounded-full shrink-0"
        style={{
          width: size,
          height: size,
          background: "var(--color-verified-soft)",
          border: "1px solid var(--color-verified)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <ShieldCheck
          size={size * 0.55}
          strokeWidth={2.25}
          style={{ color: "var(--color-verified)" }}
        />
      </div>
      {label && (
        <span
          className="text-sm font-semibold"
          style={{ color: "var(--color-ink)" }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

