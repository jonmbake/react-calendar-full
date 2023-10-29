const path = require('path');

module.exports = {
  entry: './src/index.tsx', // Entry file
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist', 'umd'),
    libraryTarget: 'commonjs2', // This ensures the output is in CommonJS format
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

