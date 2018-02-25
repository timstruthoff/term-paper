const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');


module.exports = merge(common, {
    entry: {
        controller: './app/client/controller/main.js',
        viewer: './app/client/viewer/main.js'
    },
    plugins: [
        new CleanWebpackPlugin(['*'], {
            root: path.join(__dirname, '..', '..', 'dist/')
        }),
        new UglifyJSPlugin()
    ]
});