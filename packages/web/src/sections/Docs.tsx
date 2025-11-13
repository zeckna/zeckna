const docsLinks = [
  { title: 'Quickstart Guides', description: 'Install the SDK, initialize agents, and send shielded transfers in minutes.' },
  { title: 'API Reference', description: 'Typed definitions for every module, including proof generation and AI orchestration.' },
  { title: 'Architecture Notes', description: 'Deep dives into Zcash circuit integrations, Solana bridges, and agent sandboxing.' }
];

export function Docs() {
  return (
    <section id="docs" className="bg-slate-950 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[32px] border border-white/10 bg-white/5 px-8 py-12 backdrop-blur md:px-14 md:py-16">
          <div className="grid gap-10 md:grid-cols-[1.2fr,1fr] md:gap-16">
            <div>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">Documentation designed for builders.</h2>
              <p className="mt-4 text-base text-white/70">
                Access comprehensive examples, SDK references, and compliance-friendly guides for implementing Zeckna’s
                privacy stack in web, mobile, or institutional pipelines.
              </p>
              <a
                href="https://docs.zeckna.com"
                className="mt-8 inline-flex items-center text-sm font-medium text-solana-start transition hover:text-solana-end"
              >
                Visit docs.zeckna.com →
              </a>
            </div>

            <div className="space-y-4">
              {docsLinks.map((link) => (
                <div key={link.title} className="rounded-2xl border border-white/10 bg-white/4 p-5">
                  <h3 className="text-sm font-semibold text-white">{link.title}</h3>
                  <p className="mt-2 text-sm text-white/65">{link.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

