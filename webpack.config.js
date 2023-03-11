/** @format */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  // Webpack is reading index.js in client folder and compiling it into output object.
  entry: './client/index.js',
  // Compiled index.js is saved in the location specified output.
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  performance: {
    hints: false
  },
  // Loaders and Rules - Loaders are JS modules that take in source files and return them in a modified state
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Gamesalt',
      template: './client/index.html',
      filename: './index.html'
    }),
  ],
  devServer: {
    hot: true,
    static:{
        // Tell the server where to serve content from.
        directory: path.resolve(__dirname, './build/'),

    /*The bundled files will be available in the browser under this path. 
    publicPath says that any request made to '/' will be served the development version of our bundle via localhost:8080. publicPath should match where we have index.html
    */
        publicPath: '/build',
        watch:true
    },
    historyApiFallback: true,
  },
};
