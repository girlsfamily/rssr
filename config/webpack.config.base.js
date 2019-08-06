const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const LoadablePlugin = require('@loadable/webpack-plugin')
const autoprefixer = require('autoprefixer')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const path = require('path')

module.exports = {
  resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
					'css-loader',
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9'
                  ],
                  flexbox: 'no-2009',
                }),
              ]
            }  
          },
					'sass-loader'
        ]
			},
			{
				test: /\.(bmp|png|(jpe?g)|gif)$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'media/[name].[hash:8].[ext]'
        }
			},
      {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        loader: "file-loader",
        options: {
          limit: 10000,
          name: 'media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        options: {
          useBabel: true,
          babelOptions: {
            babelrc: false,
            presets: [
              // "@babel/preset-react",
              "@babel/preset-typescript"
            ],
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              "@loadable/babel-plugin"
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
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },  
	plugins: [
    new LoadablePlugin()
	]
}