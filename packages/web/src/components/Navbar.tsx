import Link from 'next/link';
import Image from 'next/image';
import { Button } from './Button';

const navItems = [
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Developers', href: '#developers' },
  { label: 'Community', href: '#community' },
  { label: 'Docs', href: '#docs' }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-slate-950/70 border-b border-white/5">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold text-white">
          <Image
            src="/zeckna-logo.jpg"
            alt="Zeckna logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover shadow-glow"
            priority
          />
          <span className="text-lg tracking-wide uppercase">Zeckna</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="ghost"
            className="text-sm"
            onClick={() => window.open('https://github.com/zeckna/zeckna', '_blank')}
          >
            GitHub
          </Button>
          <Button className="text-sm" onClick={() => window.open('https://app.zeckna.com', '_blank')}>
            Launch Wallet
          </Button>
        </div>

        <div className="md:hidden">
          <Button variant="ghost" aria-label="Menu">
            ☰
          </Button>
        </div>
      </div>
    </header>
  );
}

