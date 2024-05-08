const path = require('path');

module.exports = {
  entry: './server.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js' // Output bundle file
  },
  target: 'node', // This tells webpack to compile for usage in a Node.js-like environment
  mode: 'production', // Or 'development' for development mode
  // Add loaders for other file types as needed (e.g., babel-loader for transpiling ES6)
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Example loader (if using Babel)
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
