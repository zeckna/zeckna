import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs',
    component: ComponentCreator('/docs', '4d9'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'aa5'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'f4d'),
            routes: [
              {
                path: '/docs/ai/overview',
                component: ComponentCreator('/docs/ai/overview', 'ddd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ai/privacy-advisor',
                component: ComponentCreator('/docs/ai/privacy-advisor', '7c1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ai/transaction-pipelines',
                component: ComponentCreator('/docs/ai/transaction-pipelines', 'd0e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/changelog',
                component: ComponentCreator('/docs/changelog', 'a62'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/getting-started/configuration',
                component: ComponentCreator('/docs/getting-started/configuration', '468'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/getting-started/install',
                component: ComponentCreator('/docs/getting-started/install', '62f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/getting-started/workspaces',
                component: ComponentCreator('/docs/getting-started/workspaces', '5b0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '61d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/reference/ai',
                component: ComponentCreator('/docs/reference/ai', '963'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/reference/core',
                component: ComponentCreator('/docs/reference/core', 'eb9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/reference/sdk',
                component: ComponentCreator('/docs/reference/sdk', '3cd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/sdk/keys',
                component: ComponentCreator('/docs/sdk/keys', '0a1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/sdk/quickstart',
                component: ComponentCreator('/docs/sdk/quickstart', 'a98'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/sdk/transactions',
                component: ComponentCreator('/docs/sdk/transactions', '1d7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/sdk/view-keys',
                component: ComponentCreator('/docs/sdk/view-keys', '990'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/vision',
                component: ComponentCreator('/docs/vision', '2ef'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/wallet/architecture',
                component: ComponentCreator('/docs/wallet/architecture', 'ef1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/wallet/mobile',
                component: ComponentCreator('/docs/wallet/mobile', '042'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/wallet/storage',
                component: ComponentCreator('/docs/wallet/storage', 'dc5'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
