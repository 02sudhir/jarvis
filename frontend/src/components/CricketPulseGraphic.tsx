import React from 'react';
import { motion } from 'framer-motion';

const fieldRings = [180, 140, 104, 72];

const CricketPulseGraphic: React.FC = () => {
  return (
    <div className="relative mx-auto h-[360px] w-full max-w-[640px] overflow-hidden rounded-[28px] border border-white/20 bg-[#071318] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(40,196,144,0.25),transparent_40%)]" />

      <svg viewBox="0 0 640 360" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="fieldGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#53da87" stopOpacity="0.42" />
            <stop offset="65%" stopColor="#167f43" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#0a2a18" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pitch" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7e8bf" />
            <stop offset="100%" stopColor="#d6bf8f" />
          </linearGradient>
          <linearGradient id="trail" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#ff7b00" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        <ellipse cx="320" cy="180" rx="210" ry="150" fill="url(#fieldGlow)" />

        {fieldRings.map((radius) => (
          <ellipse
            key={radius}
            cx="320"
            cy="180"
            rx={radius}
            ry={radius * 0.68}
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
        ))}

        <rect x="294" y="108" width="52" height="144" rx="8" fill="url(#pitch)" opacity="0.92" />

        <line x1="320" y1="108" x2="320" y2="252" stroke="rgba(120,84,38,0.45)" strokeWidth="2" strokeDasharray="6 6" />

        <g fill="#eaf2ff" opacity="0.9">
          <rect x="310" y="102" width="4" height="16" rx="2" />
          <rect x="318" y="102" width="4" height="16" rx="2" />
          <rect x="326" y="102" width="4" height="16" rx="2" />
          <rect x="310" y="242" width="4" height="16" rx="2" />
          <rect x="318" y="242" width="4" height="16" rx="2" />
          <rect x="326" y="242" width="4" height="16" rx="2" />
        </g>

        <path d="M136 216 C226 194, 314 120, 420 114 C478 112, 520 132, 560 178" fill="none" stroke="url(#trail)" strokeWidth="4" strokeLinecap="round" />
      </svg>

      <motion.div
        className="absolute h-7 w-7 rounded-full bg-[#d72828] shadow-[0_0_24px_rgba(215,40,40,0.75)]"
        animate={{
          x: [110, 228, 322, 426, 545],
          y: [226, 190, 130, 118, 168],
          rotate: [0, 120, 280, 470, 720],
        }}
        transition={{
          duration: 3.6,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        <div className="absolute inset-[4px] rounded-full border border-white/70" />
        <div className="absolute left-[4px] top-[11px] h-[2px] w-[18px] bg-white/70" />
      </motion.div>

      <motion.div
        className="absolute bottom-5 left-5 rounded-xl border border-white/20 bg-black/45 px-4 py-3 text-white backdrop-blur-md"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.45 }}
      >
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/95">Projected Swing</p>
        <p className="mt-1 text-lg font-semibold">15.4° Late Movement</p>
      </motion.div>
    </div>
  );
};

export default CricketPulseGraphic;
