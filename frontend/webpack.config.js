var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'dev/entry.js'),
    output: {
        path: path.resolve(__dirname, 'app/assets/js/'),
        publicPath: '/assets/js/',
        filename: 'main.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            }
        ]
    },
    externals: {}
};
