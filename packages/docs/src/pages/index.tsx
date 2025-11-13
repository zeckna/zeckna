import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import clsx from 'clsx';

import styles from './index.module.css';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Zeckna Documentation"
      description="Guides for building private multi-chain experiences with Zeckna."
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className={styles.heroTitle}>
            Build with Zeckna
          </Heading>
          <p className={styles.heroSubtitle}>
            Learn how to integrate shielded transactions, AI-driven policies, and multi-chain bridges using the Zeckna SDK
            and wallet stack.
          </p>
          <div className={styles.buttons}>
            <Link className="button button--secondary button--lg" to="/docs/intro">
              Read the docs
            </Link>
            <Link className="button button--link button--lg" to="https://github.com/zeckna/zeckna">
              View on GitHub →
            </Link>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.grid}>
              <Feature
                title="Wallet & AI"
                description="Wire conversational assistants into shielded wallets using reusable pipelines and privacy guards."
              />
              <Feature
                title="Developer SDK"
                description="Generate mnemonics, derive addresses, and build shielded transactions with TypeScript and Rust."
              />
              <Feature
                title="Secure Architecture"
                description="Follow best practices for encrypted storage, viewing keys, and cross-chain attestations."
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

type FeatureProps = {
  title: string;
  description: string;
};

function Feature({ title, description }: FeatureProps) {
  return (
    <div className={styles.featureCard}>
      <Heading as="h3">{title}</Heading>
      <p>{description}</p>
    </div>
  );
}

