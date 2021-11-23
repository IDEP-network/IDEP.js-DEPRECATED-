
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./idepjs.cjs.production.min.js')
} else {
  module.exports = require('./idepjs.cjs.development.js')
}
