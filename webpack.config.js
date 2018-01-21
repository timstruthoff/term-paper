var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: {
        controller: './app/client/controller/js/app.js',
        viewer: './app/client/viewer/js/app.js'
        },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        // publicPath: '/dist'
    },
    module: {
        rules: [
            {
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
            template: 'app/client/controller/index.html',
            filename: 'controller.html'//,
            //js: 'controller.js'
        }),
        new HtmlWebpackPlugin({
            template: 'app/client/viewer/index.html',
            filename: 'viewer.html'//,
            //js: 'viewer.js'
        }),
        new CleanWebpackPlugin(['dist'])
    ]
};