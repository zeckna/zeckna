const features = [
  {
    title: 'Private Agent Wallets',
    description:
      'Autonomous actors synthesize shielded memos, spend keys, and policy constraints across zk circuits without exposing state.',
    items: ['Zcash Orchard proof generation', 'Multi-party key custody', 'Encrypted memo indexing']
  },
  {
    title: 'Cross-Chain Speed',
    description:
      'Execute privacy-preserving swaps on Solana in milliseconds while agents reconcile balances across transparent and shielded pools.',
    items: ['SPL token support', 'Timeline automations', 'Threshold alerts & fail safes']
  },
  {
    title: 'Developer-First SDK',
    description:
      'TypeScript + Rust SDKs give you binding-level access to proofs, agent orchestration, and programmable workflows.',
    items: ['WASM bindings for browsers & RN', 'AI intent parsing APIs', 'Typed composable modules']
  }
];

export function Features() {
  return (
    <section id="use-cases" className="bg-slate-950 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">Why teams ship with Zeckna</h2>
            <p className="mt-3 max-w-2xl text-base text-white/65">
              Blend zero-knowledge privacy, Solana-grade throughput, and AI agent execution. Design products that feel
              fast, private, and programmable out of the box.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="gradient-border rounded-3xl bg-white/5 p-8 shadow-glow hover:bg-white/8">
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-4 text-sm text-white/65">{feature.description}</p>
              <ul className="mt-6 space-y-2 text-sm text-white/75">
                {feature.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-solana-start" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

