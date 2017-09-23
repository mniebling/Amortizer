// Run JS through Browserify with plugins and write it to dist/bundle.js
const browserify = require('browserify')
const browserifyIncremental = require('browserify-incremental')
const fs = require('fs-extra')

const isDev = (process.env.NODE_ENV !== 'production')

const browserifyOptions =
  { cache: {}
  , cacheFile: './browserify-cache.json'
  , debug: isDev
  , entries: 'src/main.js'
  , fullPaths: true
  , packageCache: {}
  }


module.exports = function bundle () {

  console.log('Bundling javascript to `dist/bundle.js`')
  console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)

  let bundler = isDev
    ? browserifyIncremental(browserifyOptions)
    : browserify(browserifyOptions)

  bundler.transform(require('envify'))
  bundler.transform(require('vueify'))
  bundler.transform(require('babelify'),
    { presets: [ require('babel-preset-es2015') ]
    }
  )

  bundler.on('time', ms => {
    console.log(`Generated bundle in ${ms}ms`)
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
        .on('finish', resolve)
        .on('error', reject)
      )
  })
}
