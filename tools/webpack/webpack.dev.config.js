const path = require('path');
const webpack = require('webpack');

const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';


module.exports = merge(common, {
    entry: {
        controller: ['./app/client/controller/main.js', hotMiddlewareScript],
        viewer: ['./app/client/viewer/main.js', hotMiddlewareScript],
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});