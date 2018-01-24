const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: {
        controller: './app/client/controller/main.js',
        viewer: './app/client/viewer/main.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    output: {
        path: path.resolve(__dirname, '../../dist'),
        filename: '[name].[hash].js',
        // publicPath: '/dist'
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
        new CleanWebpackPlugin(['*'], {
            root: path.join(__dirname, '..', '..', 'dist/')
        }),
        new HtmlWebpackPlugin({
            // inject: false,
            chunks: ['commons', 'controller'],
            //template: './../app/client/static/index.handlebars',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            // inject: false,
            chunks: ['commons', 'viewer'],
            //template: './../app/client/static/index.handlebars',
            filename: 'viewer.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons' // Specify the common bundle's name.
        })
    ]
};