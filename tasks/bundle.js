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

  // fs.createWriteStream is a stream, not a promise, so we need to promisify
  // it in order to run the build steps in order. I'm not sure why this is
  // necessary -- I thought that fs-extra promisified the native fs methods
  // already and this would "just work".
  return new Promise(function (resolve, reject) {
    bundler
      .bundle()
      .pipe(fs
        .createWriteStream('dist/bundle.js')
        .on('finish', () => {
          console.log('Done bundling!\n')
          resolve()
        })
        .on('error', reject)
      )
  })
}
