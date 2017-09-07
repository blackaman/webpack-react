const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const debug = true;
const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css'
});

const uglifyjs = new UglifyJsPlugin({
  output: {
    comments: false
  },
  compress: {
    warnings: false
  }
});

let plugin = [
  new HtmlWebpackPlugin({
    title: '主页',
    template: path.resolve(__dirname, 'app/index.html')
  }),
  new CleanWebpackPlugin(['build']),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('dev')
  }),
  extractSass
];
plugin = debug ? plugin : [...plugin, uglifyjs];

module.exports = {
  entry: path.resolve(__dirname, 'app/index.js'),
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.js[x]?$/,
        include: path.resolve(__dirname, 'app'),
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  devtool: debug ? 'inline-source-map' : false,
  devServer: {
    host: '0.0.0.0'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [...plugin]
};
