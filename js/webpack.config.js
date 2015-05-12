var path = require('path');

var config = {
    entry: path.resolve(__dirname, './app/app.js'),
    output: {
        path: path.resolve(__dirname, '../assets/js'),
        filename: 'main.js'
    },
    module: {
    	loaders: [
			{
				test: /\.js$/,
				loader: 'jsx-loader?insertPragma=React.DOM&harmony'
			}
    	]
    }
    // externals: {
    // 	'react': 'React'
    // }
};

module.exports = config;