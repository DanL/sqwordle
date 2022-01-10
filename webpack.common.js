const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist/release'),
    filename: 'sqwordle.js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    // https://github.com/webpack/docs/wiki/Configuration#resolveextensions
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.sass'],
  },
  plugins: [
    // Avoid having to import React explicitly when using JSX
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
}
