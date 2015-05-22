var path = require('path');
var webpack = require('webpack');

var config = {
    entry: [
        'webpack/hot/dev-server',
        path.resolve(__dirname, 'dev/entry.js')
    ],
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
    externals: {
        // 'react': 'React',
        // 'd3': 'd3'
        // 'h337': 'h337'
    }
};

module.exports = config;