import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
import copy from 'rollup-plugin-copy'

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
    copy({
      copyOnce: true,
      verbose: true,
      targets: [
        { src: 'assets/images', dest: 'dest/' },
        { src: 'assets/music', dest: 'dest/' },
        { src: 'assets/sfx', dest: 'dest/' },
        { src: 'assets/terrain', dest: 'dest/' }
      ]
    }),
    serve('./dest')
  ]
}
