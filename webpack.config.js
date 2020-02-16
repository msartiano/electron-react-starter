const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({})
  ],
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
                '@babel/preset-env',
                '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  }
};