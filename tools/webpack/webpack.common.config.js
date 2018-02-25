const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    output: {
        path: path.resolve(__dirname, '../../dist'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['commons', 'controller'],
            template: './app/client/controller/index.handlebars',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['commons', 'viewer'],
            template: './app/client/viewer/index.handlebars',
            filename: 'viewer/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons'
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};