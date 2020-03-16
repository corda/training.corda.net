# Corda Training docs application

# Install

Requires [npm](https://www.npmjs.com/get-npm)

To install this app, run:
```
npm install
```

The content is included as submodule, to fetch it initially run:
```
git submodule init
git submodule update
```

# Running local server

Once done you can run a local development server, which auto-reloads on content updates by running:
```
npm start
```
Starts a server on [127.0.0.1:4000](http://127.0.0.1:4000)

# Production build

To build the static html output for the production site, run:
```
npm run build
```

The `--prefix-paths` option will construct links using the path_prefix specified in the `gatsby-config.js`
