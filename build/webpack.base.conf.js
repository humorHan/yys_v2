const path = require('path');
const utils = require('./utils');
const config = require('../config');
const pages = require('../config/pages');

const entry = {};
pages.forEach((page) => {
    entry[page.entry.key] = page.entry.file;
});

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry,
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': resolve('src'),
            pages: resolve('src/pages'),
            components: resolve('src/components'), // react component
            features: resolve('src/features'), // react features component
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [resolve('src')],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
                },
            },
        ],
    },
};
