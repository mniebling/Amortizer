const bundle = require('./bundle')
const clean = require('./clean')
const copyStaticFiles = require('./copy-static-files')


const build = function () {

  return clean()
    .then(copyStaticFiles)
    .then(bundle)
    .catch(console.error)
}


module.exports = build


const invokedAsScript = (require.main === module)

if (invokedAsScript) build()
