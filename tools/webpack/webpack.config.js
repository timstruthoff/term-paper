const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';


module.exports = {
    entry: {
        controller: ['./app/client/controller/main.js', hotMiddlewareScript],
        viewer: ['./app/client/viewer/main.js', hotMiddlewareScript],
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
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
        new CleanWebpackPlugin(['*'], {
            root: path.join(__dirname, '..', '..', 'dist/')
        }),
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
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
};