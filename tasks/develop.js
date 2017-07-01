const browserSync = require('browser-sync').create()
const budo = require('budo')
const chokidar = require('chokidar')

const build = require('./build')

const sources =
  [ 'src/**'
  , 'index.html'
  ]

const chokidarOptions = { ignored: 'dist/**' }

const browserSyncConfig =
  { ghostMode: false
  , notify: false
  , open: true
  , server: 'dist'
  }

// Build once
build().then(() => {

  browserSync
    .watch(sources, chokidarOptions)
    .on('change', (path) => {
      console.log(`\nFile changed: ${path}`)
      build().then(browserSync.reload)
    })

  browserSync.init(browserSyncConfig)
})
