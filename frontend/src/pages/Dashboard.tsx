import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Gauge, Radar, Sparkles, Zap } from 'lucide-react';
import { apiService } from '../services/api.service';
import CricketPulseGraphic from '../components/CricketPulseGraphic';

type MatchItem = {
  title?: string;
  format?: string;
};

const Dashboard: React.FC = () => {
  const [liveMatches, setLiveMatches] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveMatches = async () => {
      try {
        setLoading(true);
        const response = await apiService.getLiveMatches();
        setLiveMatches(response.data.data || []);
      } catch (error) {
        console.error('Error fetching live matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveMatches();
  }, []);

  const statCards = useMemo(
    () => [
      { label: 'Live Sim Streams', value: `${liveMatches.length || 12}`, icon: Radar },
      { label: 'Tracked Players', value: '2.8K', icon: Gauge },
      { label: 'Model Confidence', value: '97.2%', icon: Sparkles },
      { label: 'Fantasy Signal Gain', value: '+18.6%', icon: Zap },
    ],
    [liveMatches.length]
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050d12] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_5%,rgba(34,197,94,0.18),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(59,130,246,0.2),transparent_34%),linear-gradient(120deg,#041017_0%,#071920_40%,#09141f_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:42px_42px]" />

      <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-emerald-200"
        >
          Real-Time Intelligence Layer
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <h2 className="max-w-2xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[60px]">
              Feel the Match Before
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent"> the Ball Lands.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base text-slate-200/85 sm:text-lg">
              A cinematic analytics cockpit for cricket enthusiasts, fantasy players, and betting analysts.
              Monitor momentum shifts, projected outcomes, and player impact in one immersive screen.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button className="rounded-xl bg-emerald-300 px-5 py-3 text-sm font-semibold text-[#03220f] transition hover:scale-[1.02] hover:bg-emerald-200">
                Launch Match Center
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Explore Pro Tier
                <ArrowUpRight size={14} />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <CricketPulseGraphic />
          </motion.div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map(({ label, value, icon: Icon }, index) => (
            <motion.article
              key={label}
              className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-lg"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + index * 0.08 }}
            >
              <div className="mb-4 inline-flex rounded-lg border border-cyan-300/30 bg-cyan-300/10 p-2 text-cyan-200">
                <Icon size={16} />
              </div>
              <p className="text-sm text-slate-300/90">{label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.section
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="rounded-3xl border border-white/15 bg-black/25 p-6 backdrop-blur-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Live Match Signal Board</h3>
              <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
                In Play
              </span>
            </div>

            {loading ? (
              <div className="grid h-40 place-items-center">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-300/20 border-t-cyan-300" />
              </div>
            ) : liveMatches.length > 0 ? (
              <div className="space-y-3">
                {liveMatches.slice(0, 4).map((match, idx) => (
                  <div
                    key={`${match.title ?? 'match'}-${idx}`}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4"
                  >
                    <div>
                      <p className="font-semibold text-white">{match.title ?? 'Live Match'}</p>
                      <p className="text-sm text-slate-300">{match.format ?? 'T20'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-300">Win Projection</p>
                      <p className="text-lg font-semibold text-emerald-300">{Math.round(55 + idx * 7)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-slate-300">
                No live matches right now. The signal board will auto-populate as soon as play begins.
              </div>
            )}
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.33 }}
            className="rounded-3xl border border-white/15 bg-gradient-to-b from-sky-400/20 to-emerald-400/10 p-6 backdrop-blur-xl"
          >
            <h3 className="text-xl font-semibold">Fantasy Captain Radar</h3>
            <p className="mt-2 text-sm text-slate-200/90">AI-driven impact score for next spell window.</p>

            <div className="mt-6 space-y-4">
              {[
                { name: 'S. Gill', impact: 88 },
                { name: 'J. Bumrah', impact: 84 },
                { name: 'R. Ravindra', impact: 81 },
              ].map((p) => (
                <div key={p.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-white">{p.name}</span>
                    <span className="text-cyan-200">{p.impact}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300"
                      initial={{ width: 0 }}
                      animate={{ width: `${p.impact}%` }}
                      transition={{ duration: 0.9, delay: 0.4 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
