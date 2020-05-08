/*  Gatsby config for the Corda Training app
    Added some dynamic loading, env/ci build handling and prevalidations.
    Does throw an "ERROR #85923  GRAPHQL" error sometimes on recompilation - just try again fresh.

    Author: Ibo Sy - B9lab
*/

const fs = require('fs');
const themeOptions = require('./theme-options');
const remarkTypescript = require('remark-typescript');


/* Configuration */

const defaultExportPath = "/training/";
const contentFolder = "./content/";


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
    if(!fs.existsSync(contentFolder + elem + ".mdx")) {
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

  return defaultExportPath + env_target;
}



/* load / setup config objects */
const sidebarConfig = getSidebarConfig();
const pathPrefix = getPathPrefix();

const apolloDocsOptions = {
  ...themeOptions,
  root: __dirname,
  subtitle: 'Corda Training and Tutorials',
  description: 'Learn how to use the Corda platform',
  githubRepo: 'corda/corda',
  sidebarCategories: sidebarConfig,
}

/*  WORKAROUND: To configure the remark plugin configuration, we need to touch the gatsby-plugin-mdx config which is inside the theme
    and can not be configured directly. This should be possible in the future with a onPluginOptions hook (https://github.com/gatsbyjs/gatsby/issues/16697).
    Until this is implemented, we can write our own configuration, merging it with the theme's config (credit to https://github.com/gatsbyjs/gatsby/issues/16593#issuecomment-580037645).
    
    Config structure:
    gatsby-theme-apollo-docs/gatsby-config.js
    ├─gatsby-plugin-mdx
    │ ├─gatsbyRemarkPlugins: gatsbyRemarkPlugins
    │ └─remarkPlugins
    └─gatsby-transformer-remark
      └─plugins: gatsbyRemarkPlugins
*/
const apolloRemarkPluginConfig = require("gatsby-theme-apollo-docs/gatsby-config.js")({
  ...apolloDocsOptions,
  sidebarCategories: sidebarConfig
});

const apolloGatsbyRemarkPlugins = apolloRemarkPluginConfig.plugins.find(i => i.resolve == "gatsby-transformer-remark").options.plugins;

// This is the gatsby-transformer-remark config -> remark pipeline
const remarkPluginConfig = [
  {
    resolve: "gatsby-remark-embed-video",
    options: {
      width: "100%",
      //ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
      height: 400, // Optional: Overrides optional.ratio
      related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
      noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
    }
  },
  {
    resolve: "gatsby-remark-images",
    options: {
      maxWidth: 736,
      linkImagesToOriginal: false,
      showCaptions: true,
      quality: 0
    }
  },
  {
    resolve: "gatsby-remark-images-zoom",
    options: {
    }
  }
]



/* Prevalidation / checks */

console.log("Dynamic gatsby configuration:")
console.log("> Build type: " + (isProductionBuild() ? "production" : "develop"));
console.log("> Sidebar:");
console.log(sidebarConfig);
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
      options: apolloDocsOptions,
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: remarkPluginConfig.concat(apolloGatsbyRemarkPlugins)
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: remarkPluginConfig.concat(apolloGatsbyRemarkPlugins),
        remarkPlugins: [
          [remarkTypescript, {wrapperComponent: 'MultiCodeBlock'}]
        ]
      }
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: 1,
        pngCompressionSpeed: 10
      },
    },
    //"gatsby-plugin-slug"
  ],
};
