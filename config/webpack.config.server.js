const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: "production",
  target: "node",
  entry: path.resolve(__dirname, "../server/index.ts"),
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: "server.bundle.js"
  },
  resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
  module: {
		rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        options: {
          useBabel: true,
          babelOptions: {
            babelrc: false,
            plugins: [
              "dynamic-import-node"
            ]
          },
          babelCore: "@babel/core"
        }
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
		]
  },
  externals: [nodeExternals()]
}