#! /usr/bin/env node


// www.js, index.js, main.js, etc
const TSModuleAlias = require('@momothepug/tsmodule-alias');
// Path from package.json to your tsconfig.json file
const tsconfigToReadFromRoot = './';
// Makes it work with play method, merging custom aliases
const aliasRegister = TSModuleAlias.play(tsconfigToReadFromRoot, {
    '@crazyAlias': __dirname + '/path/to/my/object'
});
// Alias map loaded to nodejs from typescript paths (optional)
// console.log(aliasRegister.nodeRegister.aliasMap);
// Displays root module and typescript project path (optional)
// console.log(aliasRegister.currentEnvironmentData);
