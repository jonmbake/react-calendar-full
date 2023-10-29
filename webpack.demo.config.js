const path = require('path');

module.exports = {
  entry: './demo/index.tsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist', 'demo'),
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

