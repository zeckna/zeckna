import Image from 'next/image';

const links = {
  product: [
    { label: 'Use Cases', href: '#use-cases' },
    { label: 'Developers', href: '#developers' },
    { label: 'Docs', href: '#docs' }
  ],
  company: [
    { label: 'Community', href: '#community' },
    { label: 'Twitter', href: 'https://x.com/zecknawallet' },
    { label: 'GitHub', href: 'https://github.com/zeckna/zeckna' },
    { label: 'Contact', href: 'mailto:hello@zeckna.dev' }
  ]
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:flex-row md:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-white">
            <Image
              src="/zeckna-logo.jpg"
              alt="Zeckna logo"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover shadow-glow"
            />
            <span className="text-lg font-semibold">Zeckna</span>
          </div>
          <p className="max-w-sm text-sm text-white/60">
            Privacy-first wallet, SDK, and AI agent stack for multi-chain finance, built on Zcash and Solana.
          </p>
          <p className="text-xs text-white/40">© {new Date().getFullYear()} Zeckna. All rights reserved.</p>
        </div>

        <div className="flex flex-wrap gap-12 text-sm text-white/65">
          <div>
            <h4 className="font-semibold text-white">Product</h4>
            <ul className="mt-3 space-y-2">
              {links.product.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Company</h4>
            <ul className="mt-3 space-y-2">
              {links.company.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

