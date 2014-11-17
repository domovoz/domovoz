'use strict';
var _ = require('lodash');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = _.merge(
  require('./env/all.js'),
  require('./env/' + process.env.NODE_ENV + '.js') || {}
);