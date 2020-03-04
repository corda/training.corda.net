const navConfig = {
  'Corda Open Source': {
    url: '/',
    description:
      'Documentation for the free version of Corda'
  },
  'Corda Enterprise': {
    url: '/enterprise',
    description:
      'Documentation for the Enteprirse version of Corda'
  },
  'CENM': {
    url: '/cenm',
    description:
      "Documentation for the Corda Enteprirse Network Manager"
  },
  'Corda Training ': {
    url: '/training',
    description: 
      "Tutorials and training for everything Corda"
  }
};

const footerNavConfig = {
  Blog: {
    href: 'https://www.r3.com/blog/',
    target: '_blank',
    rel: 'noreferrer'
  },
  Contribute: {
    href: 'https://www.corda.net/contribute-code/'
  },
  'Stack Overflow': {
    href: 'https://stackoverflow.com/questions/tagged/corda',
    target: '_blank',
    rel: 'noreferrer'
  },
  Slack: {
    href: 'https://corda.slack.com',
    target: '_blank',
    rel: 'noreferrer'
  }
};

module.exports = {
  siteName: 'Corda Docs',
  menuTitle: 'Corda',
  menuTitle: 'Corda Platform',
  segmentApiKey: 'wgrIo8Bul0Ujl8USETG3DB6hONdy4kTg',
  algoliaApiKey: '768e823959d35bbd51e4b2439be13fb7',
  algoliaIndexName: 'cordadata',
  baseUrl: 'https://www.corda.net',
  twitterHandle: 'cordablockchain',
  slackUrl: 'https://corda.slack.com/',
  youtubeUrl: 'https://www.youtube.com/channel/UCoOuUZatvIC1U65OisCrIKg',
  logoLink: 'https://docs.corda.net/',
  baseDir: 'docs',
  contentDir: 'source',
  navConfig,
  footerNavConfig
};
