const through = require('through2')
const fs = require('fs')

function appendReplacer (file, capture, ...match) {
  fs.appendFile(file, match[capture || 0],
    err => { if (err) throw err })

  return ''
}

function extract (file, options) {
  if (!options) throw 'Collectify is missing required options.'
  if (!options.file) throw 'Collectify is missing required file option'
  if (!options.regex) throw 'Collectify is missing required regex option'

  let replacer = appendReplacer.bind(this, options.file, options.capture)
  return through(function (buf, enc, next) {
    let contents = buf.toString('utf8').replace(options.regex, replacer)
    this.push(contents)
    next()
  })
}

module.exports = function collectify (b, options) {
  b.on('bundle', function () {
    try { fs.unlinkSync(options.file) }
    catch (e) {
      if (e.code != 'ENOENT') throw e
    }
  })
  b.transform(extract, options)
}
