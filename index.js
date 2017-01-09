#!/usr/bin/env node
require('./server.typescript');
var path = require('path');
const rootDir = path.resolve(__dirname, '.');

global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  if (!require('piping')({
      hook: false,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })) {
    return;
  }
}

if (__DEVELOPMENT__) {
  var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
  global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack/webpack-isomorphic-tools'))
    .server(rootDir, function() {
      require('./src/server');
    });
}
