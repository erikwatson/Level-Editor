const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'editor.js',
    path: path.resolve(__dirname, 'dest')
  },
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /(node_modules|dist)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
}
