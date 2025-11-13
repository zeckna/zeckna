const initiatives = [
  {
    title: 'Ambassador Network',
    description: 'Educate institutions on private DeFi workflows, host workshops, and earn ZEC staking grants.'
  },
  {
    title: 'Forum & Research',
    description: 'Discuss best practices for shielded bookkeeping, zk audits, and AI agent policy controls.'
  },
  {
    title: 'Bug Bounty',
    description: 'Report protocol vulnerabilities via Immunefi-style programs with private disclosure channels.'
  }
];

export function Community() {
  return (
    <section id="community" className="bg-slate-950 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 text-center md:gap-6">
          <span className="mx-auto inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase text-white/70">
            Community & Support
          </span>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Build with other privacy-first teams.</h2>
          <p className="mx-auto max-w-2xl text-base text-white/65">
            Join the Zeckna ecosystem to access research, co-marketing, and enterprise integrations that keep privacy,
            compliance, and AI automation aligned.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {initiatives.map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/4 p-6 text-left">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-white/65">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

