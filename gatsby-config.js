/*  Gatsby config for the Corda Training app

    Changing this file in dev mode will require a server restart

    - Theme options are retrieved from theme-options.js
    - Sidebar content is loaded from structure.js in the contentFolder

    You can enable the disableImageProcessing flag to speed up dev builds.

    This configuration modifies the Theme's remark pipeline (mdx renderer), based on gatsby-transformer-remark.
    Further remark plugins can be added to the remarkPluginConfig list.
*/

const fs = require('fs');
const themeOptions = require('./theme-options');
const remarkTypescript = require('remark-typescript');


/*  Configuration  */

const defaultExportPath = "/";        // Export path option passed to gatsby (deployment path prefix)
const contentFolder = "./content/";   // Mdx source folder
const disableImageProcessing = false; // Disable image processing for dev build


/*  Helper functions */

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

/* checks existence for all linked config files */
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

/* Returns path prefix from env. Also adds optional env.CONTENT_BUILD_TARGET_SUBFOLDER (used for ci deployments into subfolders) */
const getPathPrefix = () => {
  let env_target = process.env.CONTENT_BUILD_TARGET_SUBFOLDER;
  if (typeof(env_target)==="undefined") env_target = "";

  return defaultExportPath + env_target;
}



/*  Load external config and setup config for gatsby */
const sidebarConfig = getSidebarConfig();
const pathPrefix = getPathPrefix();

const apolloDocsOptions = {
  ...themeOptions,
  root: __dirname,
  subtitle: 'Corda Training and Tutorials',
  description: 'Learn how to use the Corda platform',
  githubRepo: 'corda/training.corda.net',
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

// This is the gatsby-transformer-remark config -> remark pipeline configuration
let remarkPluginConfig = [
  {
    resolve: "gatsby-remark-embed-video",
    options: {
      width: "100%",
      height: 400,
      related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
      noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
    }
  },
  {
    resolve: `gatsby-remark-katex`,
    options: {
      // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
      strict: `ignore`
    }
  },
]

if (!disableImageProcessing) {
  remarkPluginConfig = remarkPluginConfig.concat([
    {
      resolve: "gatsby-remark-images",
      options: {
        maxWidth: 736, // page max container width
        linkImagesToOriginal: false,
        showCaptions: true,
        quality: 7
      }
    },
    {
      resolve: "gatsby-remark-images-zoom",
      options: {
      }
    }
  ]);
}


/* Prevalidation and Info */
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
  siteMetadata: {
    siteUrl: `https://training.corda.net`,
  },
  plugins: [
    {
      resolve: 'gatsby-theme-apollo-docs',
      options: apolloDocsOptions,
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: remarkPluginConfig.concat(apolloGatsbyRemarkPlugins, ['gatsby-remark-autolink-headers', 'gatsby-remark-check-links'])
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
        stripMetadata: true
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-87760032-4",
        head: false,
        cookieDomain: "corda.net",
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    }
  ]
};
