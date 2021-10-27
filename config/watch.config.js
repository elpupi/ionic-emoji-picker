const defaultConfig = require('../node_modules/@ionic/app-scripts/config/watch.config');

// https://github.com/ionic-team/ionic-app-scripts/issues/474


defaultConfig.srcFiles.paths.push(...[
    '../JsonObjectParser/src/parser/**/*.ts',
    '../FeaturesDetection/src/**/*.ts',
    '../Proxy/src/**/*.ts',
    '../Stickies/src/**/*.ts'
    // '{{SRC}}/**/*.(ts|html|s(c|a)ss)'
]);

module.exports = defaultConfig;
