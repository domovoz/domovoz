'use strict';
var express = require('express'),
  router = express.Router();

module.exports = function(app, auth) {
  app.use('/', router);
};
