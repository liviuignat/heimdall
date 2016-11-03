#!/usr/bin/env node
require('./server.typescript');

global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  if (!require('piping')({
      hook: false,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })) {
    return;
  }
}

require('./src/server');
