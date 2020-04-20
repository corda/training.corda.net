/*  Gatsby config for the Corda Training app
    Added some dynamic loading, env/ci build handling and prevalidations.
    Does throw an "ERROR #85923  GRAPHQL" error sometimes on recompilation - just try again fresh.

    Author: Ibo Sy - B9lab
*/

const fs = require('fs');
const themeOptions = require('./theme-options');

/* Helper functions */

const isProductionBuild = () => {
  return process.env.gatsby_executing_command == "build" ? true : false;
}

/*  Load sidebar content from content folder file. The loaded file exports:
    {
      'Section Name': [
        path_to/file'
      ]
    }
*/
const getSidebarConfig = () => {
  const sidebarContent = require('./content/structure.js');
  const sidebarDefaults = {
    null: [
      'index',
    ]
  };
  
  return sidebarCategories = {...sidebarDefaults, ...sidebarContent};
}

/* check existence for all linked config files */
const validateSidebarConfig = (sidebarConfig) => {
  let valid = true;
  Object.entries(sidebarConfig).forEach(([key,elem]) => {
    valid = valid && validateSidebarSubTree(key, elem);
  });

  return valid;
}

const validateSidebarSubTree = (key, tree) => {
  let ret = true;
  console.log("check: ")
  console.log(tree);

  if (key==="null") return;

  Object.entries(tree).forEach(([key,elem]) => {
    
    if (typeof(elem==="Array")) {
      ret = ret && validateSidebarSubTree(elem);
      return;
    }

    if(!fs.existsSync(elem + ".mdx")) {
      console.log("Sidebar Config ERROR: File " + elem + ".mdx not found!");
      ret = false;
    }
  });

  return ret;
}

/* Returns the path prefix for gatsby. Note that this is being used for production build (gatsby build)*/
const getPathPrefix = () => {
  let env_target = process.env.CONTENT_BUILD_TARGET_SUBFOLDER;
  if (typeof(env_target)==="undefined") env_target = "";

  return '/training/' + env_target;
}



/* Prevalidation / checks */
const sidebarConfig = getSidebarConfig();
const pathPrefix = getPathPrefix();
const isValidSiderbarConfig = validateSidebarConfig(sidebarConfig);

if (isProductionBuild()) {
  if (!isValidSiderbarConfig) {
    console.log("BUILD FAILED: Invalid sidebarConfig");
    return false;
  }
}


console.log("Dynamic gatsby configuration:")
console.log("> Build type: " + (isProductionBuild() ? "production" : "develop"));
console.log("> Sidebar");
console.log(sidebarCategories);
console.log("> Path prefix:");
console.log(pathPrefix);

/* Gatsby config export */
module.exports = {
  pathPrefix: pathPrefix,
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
