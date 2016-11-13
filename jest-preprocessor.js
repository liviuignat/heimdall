const tsc = require('typescript');
const tsConfig = require('./tsconfig.json');

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      var tscCode = tsc.transpile(
        src,
        tsConfig.compilerOptions,
        path,
        []
      );
      debugger;
      return tscCode;
    }
    return src;
  },
};
