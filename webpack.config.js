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
      {
        test: /.(css|scss)$/,
        exclude: [/node_modules/, /client\/stylesheets\/modules/],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
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
    port: 8080,
    static:{
        // Tell the server where to serve content from.
        directory: path.resolve(__dirname, './client/'),

    /*The bundled files will be available in the browser under this path. 
    publicPath says that any request made to '/' will be served the development version of our bundle via localhost:8080. publicPath should match where we have index.html
    */
        publicPath: '/build',
        watch:true
    },
    historyApiFallback: true,

    // Proxy says taht any request made to '/test' will be routed to our server on localhost:3000
    // proxy should match whatever is going to match your fetch request on your frontend.
    proxy: {
        '/table/**': {
            target: 'http://localhost:3000/',
            secure: false,
        },
        '/user/**': {
            target: 'http://localhost:3000/',
            secure: false,
        },
      },
    },
};
