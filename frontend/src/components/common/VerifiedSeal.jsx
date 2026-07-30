import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function VerifiedSeal({ size = 48, points, className = '' }) {
  return (
    <div 
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{
        width: size, 
        height: size, 
        borderRadius: '50%',
        background: 'var(--color-verified-soft)',
        border: '1px solid var(--color-verified)',
        boxShadow: 'var(--shadow-soft-md)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
      }}
    >
      <CheckCircle2 size={size * 0.55} style={{ color: 'var(--color-verified)', fill: 'var(--color-verified-soft)' }} strokeWidth={2.5} />
    </div>
  );
}

