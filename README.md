# Corda Training docs application

## Install

To clone, use:

```sh
git clone --recursive THIS_PROJECT
```

Requires [npm](https://www.npmjs.com/get-npm)

To install this app, run:

```sh
npm install
```

The content is included as submodule, if you did not clone with `-r`, you can fetch it initially with:

```sh
git submodule init
git submodule update
```

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

## Sidebar content

The sidebar content (left main navigation) is dynamically loaded in `gatsby-config.js` by importing `content/structure.js`. This file can include further subfiles to build a content tree.
