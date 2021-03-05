const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: __dirname + '/client/src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public'
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: __dirname + "/client/src/index.html"
    }),
    new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: [/\.js|jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  }
};