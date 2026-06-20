import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Crown, ShieldCheck } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08151b]/75 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-300/40 bg-emerald-400/10 text-emerald-300 shadow-[0_0_30px_rgba(48,213,138,0.25)]">
            <Activity size={20} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/80">Cricket OS</p>
            <h1 className="text-base font-semibold leading-none sm:text-lg">Real-time Match Intelligence</h1>
          </div>
        </motion.div>

        <nav className="hidden items-center gap-2 md:flex">
          {['Live Center', 'Player Lab', 'Fantasy Engine', 'Bet Edge'].map((item) => (
            <a
              key={item}
              href="/"
              className="rounded-xl px-4 py-2 text-sm font-medium text-slate-200/90 transition hover:bg-white/10 hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-sky-300/25 bg-sky-400/10 px-3 py-2 text-xs text-sky-100 sm:flex">
            <ShieldCheck size={14} />
            <span>SLA 99.95%</span>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#0f172a] transition hover:scale-[1.02] hover:bg-emerald-200">
            <Crown size={14} />
            Go Pro
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
