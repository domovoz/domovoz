'use strict';
var path = require('path'),
  rootPath = path.normalize(__dirname + '/..');

module.exports = {
  root: rootPath,
  port: process.env.PORT || 9000,
  host: 'https://domovoz.herokuapp.com'
};