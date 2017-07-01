// Run JS through Browserify with plugins and write it to dist/bundle.js
const browserify = require('browserify')
const fs = require('fs-extra')


module.exports = function bundle () {

  console.log('Bundling javascript to `dist/bundle.js`')

  const bundler = browserify({ entries: 'src/main.js' })

  bundler.transform(require('vueify'))

  bundler.transform(require('babelify'),
    { presets: [ require('babel-preset-es2015') ]
    })

  bundler
    .bundle()
    .pipe(fs.createWriteStream('dist/bundle.js'))
}
