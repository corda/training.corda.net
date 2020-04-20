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
  let hasIndex = false;

  Object.entries(sidebarConfig).forEach(([key,elem]) => {
    if (key==="null") {
      hasIndex = true;
      return;
    }

    valid = validateSidebarSubTree(key, elem) && valid;
  });

  if (!hasIndex) console.log("ERR: Sidebar Config: No index found!");
  return valid && hasIndex;
}

const validateSidebarSubTree = (key, elem) => {
  let ret = true;

  

  if (Array.isArray(elem)) {
    Object.entries(elem).forEach(([sub_key,sub_elem]) => {
      ret = validateSidebarSubTree(sub_key, sub_elem) && ret;
    });
  }

  if (typeof(elem) === "string") {
    if(!fs.existsSync("./content/" + elem + ".mdx")) {
      console.log("WARN: Sidebar Config: File " + elem + ".mdx not found!");
      ret = false;
    }
  }

  return ret;
}

/* Returns the path prefix for gatsby. Note that this is being used for production build (gatsby build)*/
const getPathPrefix = () => {
  let env_target = process.env.CONTENT_BUILD_TARGET_SUBFOLDER;
  if (typeof(env_target)==="undefined") env_target = "";

  return '/training/' + env_target;
}



/* Main - load config, prevalidation / checks */
const sidebarConfig = getSidebarConfig();
const pathPrefix = getPathPrefix();


console.log("Dynamic gatsby configuration:")
console.log("> Build type: " + (isProductionBuild() ? "production" : "develop"));
console.log("> Sidebar:");
console.log(sidebarCategories);
console.log("> Path prefix:");
console.log(pathPrefix);
console.log("> Validating Sidebar")

const isValidSiderbarConfig = validateSidebarConfig(sidebarConfig);

if (!isValidSiderbarConfig) {
  if (isProductionBuild()) {
      console.log("\nERR: Invalid sidebarConfig - failing (production build)\n");
      return false;
  } else {
    console.log("\nWARN: Invalid sidebarConfig - ignored (development build)\n");
  }
} else {
  console.log("Valid");
}



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
