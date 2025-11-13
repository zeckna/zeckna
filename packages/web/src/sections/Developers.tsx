import { Button } from '@/components/Button';

const highlights = [
  {
    label: 'Rust Core',
    detail: 'Shielded proofs, Sapling/Orchard primitives, wasm-bindgen exports.'
  },
  {
    label: 'TypeScript SDK',
    detail: 'Typed wrappers, React Native support, streaming agent intents.'
  },
  {
    label: 'AI Toolkit',
    detail: 'Natural language parsing, scheduler, privacy recommendations API.'
  }
];

export function Developers() {
  return (
    <section id="developers" className="bg-slate-950 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-tr from-white/5 via-white/3 to-white/5 px-8 py-12 md:px-16 md:py-16">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-6">
              <h2 className="text-3xl font-semibold text-white md:text-4xl">Build fast with privacy by default.</h2>
              <p className="text-base text-white/70">
                Install the Zeckna SDK to generate shielded transactions, orchestrate Solana settlements, and wire AI agents
                into your own UI. Everything is open-source and designed for TypeScript + Rust engineers.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" onClick={() => window.open('https://github.com/zeckna/zeckna', '_blank')}>
                  View GitHub
                </Button>
                <Button variant="ghost" onClick={() => window.open('#docs', '_self')}>
                  SDK API Reference
                </Button>
              </div>
            </div>

            <div className="w-full max-w-sm space-y-4">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">{item.label}</h3>
                  <p className="mt-2 text-sm text-white/65">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

