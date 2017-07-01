const bundle = require('./bundle')
const clean = require('./clean')
const copyStaticFiles = require('./copy-static-files')


clean()
  .then(copyStaticFiles)
  .then(bundle)
  .catch(console.error)
