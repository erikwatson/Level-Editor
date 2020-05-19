const path = require('path')

module.exports = {
  entry: './src/editor-main.js',
  output: {
    filename: 'editor.js',
    path: path.resolve(__dirname, 'dest')
  },
  target: 'electron-renderer',
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
      },

      {
        test: /(\.scss|.sass)$/,
        exclude: /(node_modules|dist)/,
        use: [
          {
            loader: 'style-loader'
          },

          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },

          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
}
