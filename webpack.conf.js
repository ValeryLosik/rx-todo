var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

module.exports = {
    entry: [
        path.resolve(__dirname, 'src/index.js')
    ],
    devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-source-map',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'

    },
    resolve: {
        alias: {
            'rxjs': 'rxjs-es'
        }
    },
    module: {
        loaders: [{
            test: /\.js$/,
            // exclude: /(node_modules(?!\/rxjs))/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ]
};
