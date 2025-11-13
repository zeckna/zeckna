import Head from 'next/head';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { Features } from '@/sections/Features';
import { Developers } from '@/sections/Developers';
import { Community } from '@/sections/Community';
import { Docs } from '@/sections/Docs';
import { CallToAction } from '@/sections/CallToAction';

export default function Home() {
  return (
    <>
      <Head>
        <title>Zeckna | Privacy-First Multi-Chain Wallet & AI SDK</title>
        <meta
          name="description"
          content="Zeckna is a non-custodial wallet and SDK blending Zcash shielded proofs with Solana performance, powered by zk-native AI agents."
        />
      </Head>
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Developers />
          <Community />
          <Docs />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </>
  );
}

