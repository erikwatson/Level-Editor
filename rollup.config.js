import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
  input: 'src/main.js',

  output: {
    file: 'dest/main.min.js',
    format: 'iife'
  },

  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    serve('./dest')
  ]
}
