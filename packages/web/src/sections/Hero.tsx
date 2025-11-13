import Image from 'next/image';
import { Button } from '@/components/Button';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient opacity-80" />
      <div className="absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-mesh-gradient opacity-50 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-24 md:flex-row md:items-center md:py-28">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-white/70">
            Privacy-first multi-chain zk wallet + AI agents
          </div>

          <h1 className="text-4xl font-semibold leading-[1.1] text-white md:text-6xl">
            Build the future of <span className="text-solana-start">private finance</span> with{' '}
            <span className="text-solana-end">autonomous agents</span>.
          </h1>

          <p className="max-w-xl text-lg text-white/70">
            Zeckna blends Zcash shielded proofs, Solana-grade throughput, and zk-native AI to orchestrate truly private,
            programmable money movements across chains—no custodians, no compromises.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button className="text-base px-6 py-3" onClick={() => window.open('https://app.zeckna.com', '_blank')}>
              Launch Wallet
            </Button>
            <Button variant="secondary" className="text-base px-6 py-3" onClick={() => window.open('#docs', '_self')}>
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
          className="relative flex-1 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="absolute -left-10 top-10 h-24 w-24 rounded-full bg-gradient-to-br from-solana-start to-solana-end opacity-30 blur-3xl" />
          <div className="absolute -right-6 bottom-10 h-24 w-24 rounded-full bg-zcash opacity-20 blur-3xl" />

          <div className="flex items-center gap-4">
            <Image
              src="/zeckna-logo.jpg"
              alt="Zeckna emblem"
              width={72}
              height={72}
              className="h-16 w-16 rounded-full object-cover shadow-glow"
            />
            <div>
              <h2 className="text-lg font-medium text-white">Agentic Shielding Engine</h2>
              <p className="text-xs uppercase tracking-wide text-white/50">Powered by Zeckna</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-white/70">
            Compose Solana & Zcash transactions from natural language prompts. Agents reason over private state and execute
            shielded transfers autonomously, while you retain key custody at every step.
          </p>

          <div className="mt-8 space-y-4">
            {[
              ['Encrypted Wallet Orchestration', 'Shielded key operations secured by on-device MPC and zk proofs.'],
              ['Cross-Pool Liquidity', 'Bridge ZEC into Solana SPL tokens with audit-ready zero-knowledge attestations.'],
              ['Programmable Privacy', 'Trigger agents via timeline automations, heuristics, and policy APIs.']
            ].map(([title, description]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/3 p-4">
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                <p className="mt-1 text-sm text-white/60">{description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

