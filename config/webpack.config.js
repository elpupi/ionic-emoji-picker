const defaultConfig = require('../node_modules/@ionic/app-scripts/config/webpack.config');
const merge = require('webpack-merge');


const { /* CheckerPlugin, */ TsConfigPathsPlugin } = require('awesome-typescript-loader');

const config = {
    resolve: {
        plugins: [
            new TsConfigPathsPlugin(/* { tsconfig, compiler } */)
        ],
    }
};


module.exports = {
    dev: merge(config, defaultConfig.dev),
    prod: merge(config, defaultConfig.prod)
};
