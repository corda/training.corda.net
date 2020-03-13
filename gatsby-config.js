const themeOptions = require('./theme-options');

module.exports = {
  pathPrefix: '/training/',
  plugins: [
    {
      resolve: 'gatsby-theme-apollo-docs',
      options: {
        ...themeOptions,
        root: __dirname,
        subtitle: 'Corda Training and Turorials',
        description: 'Learn how to use the Corda platform',
        githubRepo: 'corda/corda',
        sidebarCategories: {
          null: [
            'index',
          ],
          'Fundementals': [
            '01-blockchain/2_basics_a',
            '01-blockchain/1_introduction',
            '01-blockchain/3_publicblockchains_a',
            '01-blockchain/5_chainofblocks',
            '01-blockchain/4_consensus_a',
            '01-blockchain/3_publicblockchains_b',
            '01-blockchain/4_consensus_b',
            '01-blockchain/6_fundamentals',
            '01-blockchain/2_basics_b',
          ],
          'Key Concepts': [
            '02-corda/1_corda_intro',
            '02-corda/2_corda_key_concepts'
          ],
          'Getting setup': [
            '03-run-example/02-install-intellij',
            '03-run-example/04-discover-example-app',
            '03-run-example/01-intro-to-git',
            '03-run-example/03-get-example-app',
            '03-run-example/05-run-terminal-see-db',
          ],
          'Writing a Cordapp': [
            '04-first-code/02-first-flow',
            '04-first-code/01-first-state-and-contract',
            '04-first-code/03-cdl',
          ],
          'Libraries': [
            '05-libraries/01-token-library',
          ]
        },
      },
    },
  ],
};
