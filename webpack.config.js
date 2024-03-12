const path = require('path');

module.exports = {
  entry: '/src/openseadragon-fabric.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'openseadragon-fabric.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development'
};