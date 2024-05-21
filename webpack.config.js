/**
 * Webpack configuration.
 */

// WordPress dependencies
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// External dependencies
const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const RtlCssPlugin = require( 'rtlcss-webpack-plugin' );

// JS Directory path.
const SRC_DIR 	= path.resolve( __dirname, 'assets/src' );
const BUILD_DIR = path.resolve( __dirname, 'assets/build' );

const entry = {
	public: SRC_DIR + '/public/index.js',
	customizer: SRC_DIR + '/customizer/index.js',
};
const output = {
	path: BUILD_DIR,
	filename: '[name]/index.js'
};

//Remove default MiniCssExtractPlugin settings
defaultConfig.plugins = defaultConfig.plugins.filter((plugin) => {
	return !(plugin instanceof MiniCssExtractPlugin);
});
defaultConfig.plugins = defaultConfig.plugins.filter((plugin) => {
	return !(plugin instanceof RtlCssPlugin);
});

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	...defaultConfig,
	entry: entry,
	output: output,
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
		],
	},
	optimization: {
		minimize: isProduction,
		minimizer: [
			'...',
			new TerserPlugin(),
			new CssMinimizerPlugin()
		]
	},
	plugins: [
		...defaultConfig.plugins,
		new MiniCssExtractPlugin({
			filename: "[name]/index.css",
		}),
		new RtlCssPlugin({
			filename: "[name]/index-rtl.css",
		}),
		new RemoveEmptyScriptsPlugin(),
	],
}