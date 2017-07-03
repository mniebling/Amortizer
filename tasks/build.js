const bundle = require('./bundle')
const clean = require('./clean')
const copyStaticFiles = require('./copy-static-files')

const isProd = (process.env.NODE_ENV === 'prod')


const build = function () {

  if (isProd) {

    return clean()
      .then(copyStaticFiles)
      .then(bundle)
      .catch(console.error)
  }

  return copyStaticFiles()
    .then(bundle)
    .catch(console.error)
}


module.exports = build


const invokedAsScript = (require.main === module)

if (invokedAsScript) build()
