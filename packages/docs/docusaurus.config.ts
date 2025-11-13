import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'Zeckna Documentation',
  tagline: 'Build private, multi-chain experiences with Zcash shielded proofs and Solana speed.',
  favicon: 'img/favicon.ico',
  url: 'https://docs.zeckna.com',
  baseUrl: '/',
  organizationName: 'zeckna',
  projectName: 'docs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/zeckna/zeckna/tree/main/packages/docs/'
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css'
        }
      } satisfies Preset.Options
    ]
  ],
  themeConfig: {
    image: 'img/zeckna-logo.jpg',
    navbar: {
      title: 'Zeckna Docs',
      logo: {
        alt: 'Zeckna logo',
        src: 'img/zeckna-logo.jpg'
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation'
        },
        {
          href: 'https://zeckna.com',
          label: 'Website',
          position: 'right'
        },
        {
          href: 'https://app.zeckna.com',
          label: 'Wallet',
          position: 'right'
        },
        {
          href: 'https://github.com/zeckna/zeckna',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro'
            },
            {
              label: 'SDK Quickstart',
              to: '/docs/sdk/quickstart'
            },
            {
              label: 'Wallet Architecture',
              to: '/docs/wallet/architecture'
            }
          ]
        },
        {
          title: 'Developers',
          items: [
            {
              label: 'API Reference',
              to: '/docs/reference/core'
            },
            {
              label: 'AI Agents',
              to: '/docs/ai/overview'
            },
            {
              label: 'Changelog',
              to: '/docs/changelog'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter / X',
              href: 'https://x.com/zecknawallet'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/zeckna/zeckna'
            },
            {
              label: 'Contact',
              href: 'mailto:hello@zeckna.dev'
            }
          ]
        }
      ],
      copyright: `© ${new Date().getFullYear()} Zeckna.`
    },
    prism: {
      theme: prismThemes.nightOwl,
      darkTheme: prismThemes.nightOwl
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true
    }
  }
};

export default config;

