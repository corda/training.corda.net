const themeOptions = require('./theme-options');

/*  Load sidebar content from content folder file. This file exports:
    {
      'Section Name': [
        path_to/file'
      ]
    }
*/
const sidebarContent = require('./content/structure.js');

const sidebarDefaults = {
  null: [
    'index',
  ]
};

const sidebarCategories = {...sidebarDefaults, ...sidebarContent};

console.log("sidebar config:");
console.log(sidebarCategories);

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
        sidebarCategories: sidebarCategories
      },
    },
  ],
};
