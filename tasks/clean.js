// Empty the contents of `dist` in preparation for building.
//
// Leave the directory so that other tasks can write streams to it without
// checking for its existence first.
const fs = require('fs-extra')


module.exports = function clean () {

  console.log('Cleaning `dist` folder.')

  return fs
    .remove('dist')
    .then(() => fs.mkdirs('dist'))
}
