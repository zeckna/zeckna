import Image from 'next/image';
import { Button } from '@/components/Button';
import { motion } from 'framer-motion';

const checklist = [
  {
    title: 'Shielded orchestration',
    description: 'Natural language instructions route to Zcash shielded flows with policy guardrails.'
  },
  {
    title: 'Liquidity routing',
    description: 'Bridge ZEC ↔ SPL assets with zero-knowledge attestations verified on every hop.'
  },
  {
    title: 'Programmable privacy',
    description: 'Schedule automations, trigger alerts, and enforce compliance checks without exposing keys.'
  }
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient opacity-70" />
      <div className="absolute -top-32 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-mesh-gradient opacity-[0.55] blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_minmax(0,1fr)]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-white/70">
              Privacy-first multi-chain zk wallet + AI agents
            </div>

            <h1 className="text-4xl font-semibold leading-[1.08] text-white md:text-6xl">
              Build the future of <span className="text-solana-start">private finance</span> with{' '}
              <span className="text-solana-end">autonomous agents</span>.
            </h1>

            <p className="max-w-xl text-lg text-white/70">
              Zeckna blends Zcash shielded proofs, Solana-grade throughput, and zk-native AI to orchestrate truly private,
              programmable money movements across chains—no custodians, no compromises.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button className="px-6 py-3 text-base" onClick={() => window.open('https://app.zeckna.com', '_blank')}>
                Launch Wallet
              </Button>
              <Button variant="secondary" className="px-6 py-3 text-base" onClick={() => window.open('#docs', '_self')}>
                Read Docs
              </Button>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <span className="rounded-full bg-white/5 px-3 py-1">Zcash Shielded</span>
                <span className="rounded-full bg-white/5 px-3 py-1">Solana Fast</span>
                <span className="rounded-full bg-white/5 px-3 py-1">ZK Agents</span>
              </div>
            </div>
          </div>

          <motion.div
            className="relative rounded-[30px] border border-white/10 bg-white/[0.06] shadow-glow backdrop-blur"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-white/10 via-white/5 to-white/0 opacity-60" />
            <div className="relative flex h-full flex-col gap-6 p-8">
              <div className="flex items-center gap-4">
                <Image
                  src="/zeckna-logo.jpg"
                  alt="Zeckna emblem"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full object-cover shadow-glow"
                  priority
                />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50">Agent console</p>
                  <h2 className="text-xl font-semibold text-white">Shielded automation dashboard</h2>
                </div>
              </div>

              <p className="text-sm text-white/70">
                Agents reason over encrypted state, craft zk-proof attestations, and hand off transactions that you approve
                with full custody retained.
              </p>

              <ul className="space-y-4 text-sm text-white/70">
                {checklist.map((item) => (
                  <li key={item.title} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-solana-start shadow-glow" />
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="text-white/65">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

