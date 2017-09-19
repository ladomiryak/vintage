const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './public/js/main.js',
    output: {
        filename: './public/js/bundle.js'
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },

            {
                test   : /\.(jpe?g|png|gif|svg|ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader : 'file-loader'
            },

            {
                test   : /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test   : /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader', 'sass-loader?sourceMap', 'postcss-loader'],
            },
        ]
    },
    resolve : {
        extensions : ['.js', '.jsx'],
        modules : ['public', 'node_modules']
    },

};