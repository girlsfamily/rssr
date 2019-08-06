const path = require('path')
const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const mode = "production"
const buildPath = (pathname) => path.join(__dirname, '../dist', pathname)

module.exports = [merge(baseConfig, {
  mode,
  entry: path.resolve(__dirname, "../src/entry.client"),
  output: {
    path: buildPath('client'),
    publicPath: '/',
    filename: "static/js/app.[chunkhash:8].js",
    chunkFilename: 'static/js/app.[chunkhash:8].chunk.js'
  },
	plugins: [
    new MiniCssExtractPlugin({
      path: buildPath('client'),
      publicPath: '/',
      filename: "static/css/[name].[chunkhash:8].css",
      chunkFilename: "static/css/[name].[chunkhash:8].chunk.css"
    })
	]
}), merge(baseConfig, {
  mode,
  target: "node",
  entry: path.resolve(__dirname, "../src/entry.server"),
  output: {
    path: buildPath('server'),
    publicPath: '/server/',
    filename: 'app.[chunkhash:8].js',
    chunkFilename: 'app.[chunkhash:8].chunk.js',
    libraryTarget: 'commonjs2'
  },
  externals: ['@loadable/component', nodeExternals()]
})]