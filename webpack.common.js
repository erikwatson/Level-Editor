const path = require('path')

module.exports = {
  entry: './src/editor-main.tsx',
  devtool: 'inline-source-map',
  output: {
    filename: 'editor.js',
    path: path.resolve(__dirname, 'dest')
  },
  target: 'electron-renderer',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.sass', '.css']
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
      },

      {
        test: /(\.ts|\.tsx)$/,
        exclude: /(node_modules|dist)/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },

      {
        test: /(\.css)$/,
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
