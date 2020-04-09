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

let env_target = process.env.CONTENT_BUILD_TARGET_SUBFOLDER;
if (typeof(env_target)==="undefined") env_target = "";

const pathPrefix = '/training/' + env_target;


console.log("Dynamic gatsby configuration:")
console.log("> Sidebar");
console.log(sidebarCategories);
console.log(">Path prefix:");
console.log(pathPrefix);

const getPathPrefix = () => {
  const envTargetFolder = process.env.CONTENT_BUILD_TARGET_SUBFOLDER

  return '/training/' + envTargetFolder;
}

module.exports = {
  pathPrefix: getPathPrefix(),
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
