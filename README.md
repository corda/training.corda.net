# Corda Training docs application

## Install

Requires [npm](https://www.npmjs.com/get-npm)

To install this app, run:

```sh
npm install
```

The page content is located in the `content` folder


## Running local server

Once done you can run a local development server, which auto-reloads on content updates by running:

```sh
npm start
```
Starts a server on [127.0.0.1:4000](http://127.0.0.1:4000)

## Production build

To build the static html output for the production site, run:

```sh
npm run build
```

The `--prefix-paths` option will construct links using the path_prefix specified in the `gatsby-config.js`

**Note** if the build process throws an error (babel has deoptimized code), run the build process again.

## Sidebar content

The sidebar content (left main navigation) is dynamically loaded in `gatsby-config.js` by importing `content/structure.js`. This file can include further subfiles to build a content tree.

## Plugin notes
The full plugin configuration can be found in the `gatsby-config.js` file.

### Prism Code highlighting
This project uses both a compile time and a runtime prism library. See `src/ExternalContent.js` for a sample use of the client side library.

For all available languages and their tags, see the [Prism list of supported languages](https://prismjs.com/#supported-languages)

# Licenses, legal and more

## Fontawesome

This page uses Font Awesome assets by Dave Gandy - http://fontawesome.io - pro version licensed by B9lab