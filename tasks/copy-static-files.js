// Copy static files to `dist`.
const fs = require('fs-extra')


module.exports = function static () {

  console.log('Copying static files to `dist`.')

  return fs.copy('index.html', 'dist/index.html')
}
