var path = require('path');

var config = {
    entry: './component/entry.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
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