module.exports = {
  title: 'My Site',
  tagline: 'The tagline of my site',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Deta',
      logo: {
        alt: 'Deta Logo',
        src: 'img/logo.svg',
      },
      to: 'docs/deta',
      links: [
        {
          to: 'docs/deta',
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
    footer: {
      style: 'light',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Slack',
              href: 'https://deta-hq.slack.com/',
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
      copyright: `Copyright © ${new Date().getFullYear()} Abstract Computing UG (haftungsbeschränkt). Built with Docusaurus.`,
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
};
