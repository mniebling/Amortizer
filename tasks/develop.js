const browserSync = require('browser-sync').create()
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
  , port: 4000
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
