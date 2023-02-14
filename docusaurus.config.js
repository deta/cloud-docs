module.exports = {
  title: 'Deta Docs',
  tagline: 'Deta Library and HTTP API docs.',
  url: 'https://docs.deta.sh',
  baseUrl: '/',
  favicon: 'img/logo.svg',
  organizationName: 'Deta',
  projectName: 'deta-docs',
  themeConfig: {
    navbar: {
      title: 'Deta',
      logo: {
        alt: 'Deta Logo',
        src: 'img/logo.svg',
        href: 'https://deta.sh',
      },
      items: [
        {
          to: 'docs/home',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/deta/docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    algolia: {
      apiKey: '4b3aaec0466a855ce8ec420d3baedde3',
      indexName: 'deta',
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://go.deta.dev/discord',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/detahq',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              href: 'https://blog.deta.sh/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/deta/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Abstract Computing UG (haftungsbeschränkt). `,
    },
    announcementBar: {
      id: 'announcement',
      content:
        'Deta Cloud is now a part of Deta Space. We will support Deta Cloud projects until May 1, 2023. <a target="_blank" rel="noopener noreferrer" href="https://deta.space/migration">Learn more about migrating here</a>',
      backgroundColor: '#F478B3',
      textColor: '#fff',
      isCloseable: false,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/deta/docs/tree/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=Karla&display=swap',
  ],
};