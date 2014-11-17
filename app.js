'use strict';
var express = require('express'),
  config = require('./server/config'),
  app = express();

require('./server/express')(app, config);
require('./server/routes');

app.listen(config.port, config.ip, function() {
  return console.log('Express server listening on %s:%d (ip:%s), in %s mode',
    config.host, config.port, config.ip, app.get('env'));
});

var exports = module.exports = app;