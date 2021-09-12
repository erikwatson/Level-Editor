const path = require('path')

const render = {
  entry: './src/editor-main.tsx',
  devtool: 'inline-source-map',
  output: {
    filename: 'editor-main.js',
    path: path.resolve(__dirname, 'dest')
  },
  target: 'electron-renderer',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.sass']
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
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules|dist)/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          { loader: 'resolve-url-loader' },
          { loader: 'postcss-loader' },
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

const electron = {
  entry: './src/electron-main.ts',
  devtool: 'inline-source-map',
  output: {
    filename: 'electron-main.js',
    path: path.resolve(__dirname, 'dest')
  },
  target: 'electron-main',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
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
      }
    ]
  }
}

module.exports = {
  electron,
  render
}
