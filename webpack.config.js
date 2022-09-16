const path = require('path');
const mode = process.env.NODE_ENV;

module.exports = {
  entry: {
    "b5": "./src/b5.js",
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: mode === 'development' ? 'p5.b5.js' : 'p5.b5.min.js'
  }
};