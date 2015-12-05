var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

module.exports = new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true
})
