module.exports = {
  watch: true,
  entry: __dirname + '/client/src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public'
  },
  mode: 'development',
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
        use: 'css-loader',
      },
      {
        test: /\.html$/i,
        use: 'html-loader',
      },
      {
        test: [/\.(woff(2)?|ttf|eot|svg)$/],
        use: [
          {
            loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
          }
        ]
      }
    ]
  }
};