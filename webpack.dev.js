const path = require('path');

module.exports = {
	mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
	},
	module: {   
		rules: [
			{ 
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
        test: /\.html$/i,
        use: ['file-loader?name=dialog.html', 'extract-loader', 'html-loader'],
      },
		] 
	}
};