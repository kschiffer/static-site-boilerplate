'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

let config = {
  context: __dirname + '/src',
  entry: {
    app: './js/app.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: 'js/bundle.js',
    publicPath: '/js',
  },
  resolve: {
    alias: {
      jquery: 'jquery/src/jquery',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [{ loader: 'jshint-loader' }],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: [['es2015', {esversion: 6}]] },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap'],
          publicPath: '/src',
        }),
      }
    ],
  },

  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin({ filename: 'css/style.css', allChunks: true }),
    new WebpackNotifierPlugin()
  ],
};

module.exports = config;
