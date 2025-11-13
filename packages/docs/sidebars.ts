import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      collapsed: false,
      items: ['intro', 'vision'],
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/install',
        'getting-started/workspaces',
        'getting-started/configuration'
      ],
    },
    {
      type: 'category',
      label: 'SDK',
      items: [
        'sdk/quickstart',
        'sdk/keys',
        'sdk/transactions',
        'sdk/view-keys'
      ],
    },
    {
      type: 'category',
      label: 'AI Agents',
      items: [
        'ai/overview',
        'ai/privacy-advisor',
        'ai/transaction-pipelines'
      ],
    },
    {
      type: 'category',
      label: 'Wallet',
      items: [
        'wallet/architecture',
        'wallet/storage',
        'wallet/mobile'
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/core',
        'reference/sdk',
        'reference/ai'
      ],
    },
    'changelog'
  ]
};

export default sidebars;

