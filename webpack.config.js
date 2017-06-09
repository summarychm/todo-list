var path = require("path");
var webpack = require("webpack");
var env = process.env.NODE_ENV;

var config = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  plugins: [],
  devServer: {},
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['env', 'es2015', 'react', 'stage-0']
          }
        },
        exclude: /node_modules/,
        include: path.join(__dirname, 'src')
      }, {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader'
        ],
        exclude: /node_modules/,
        include: path.join(__dirname, 'src')
      }
    ]
  }
};

if (env === 'production') {
  config.plugins = [
    new webpack
      .optimize
      .UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
  ]
} else {
  config.devServer = {
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/dist/",
    compress: true,
    port: 9000
  }
}
module.exports = config;