# Running docs-training

Make sure NPM is installed on your system, check out this repo, cd into the directory and run `npm install` to install all the dependencies.


Once done you can run a local development server, which auto-reloads on content updates by running:
```
gatsby develop
```

To build the static html output for the production site, run:
```
gatsby build --prefix-paths
```


The `--prefix-paths` option will construct links using the path_prefix specified in the `gatsby-config.js`