import { Button } from '@/components/Button';

export function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      <div className="absolute inset-0 bg-mesh-gradient opacity-40 blur-3xl" />
      <div className="relative mx-auto max-w-4xl rounded-[36px] border border-white/10 bg-gradient-to-r from-white/10 to-white/5 px-10 py-14 text-center shadow-glow">
        <h2 className="text-3xl font-semibold text-white md:text-4xl">Ready to deploy private AI agents?</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base text-white/70">
          Spin up shielded wallets, bridge liquidity across Solana, and automate compliance-safe workflows with Zeckna.
          Launch the beta wallet or start building with our SDK today.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button className="px-6 py-3 text-base" onClick={() => window.open('https://app.zeckna.com', '_blank')}>
            Launch Beta
          </Button>
          <Button variant="secondary" className="px-6 py-3 text-base" onClick={() => window.open('mailto:hello@zeckna.dev')}>
            Contact Team
          </Button>
        </div>
      </div>
    </section>
  );
}

