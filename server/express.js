var path = require('path'),
  express = require('express'),
  errorHandler = require('errorhandler'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  compress = require('compression'),
  methodOverride = require('method-override');

module.exports = function(app, config) {
  var env = app.get('env');
  if (env === 'development') {
    app.use(require('connect-livereload')())
      .use(errorHandler())
      .use(function(req, res, next) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
        return next();
      }
    );
  }
  app.set('views', "" + config.root).set('view engine', 'jade');
  app.locals.clientid = config.clientid;
  app.locals.clientsecret = config.clientsecret;
  app.locals.host = config.host;
  app.locals.redirect = config.redirect;
  app.locals.basedir = app.get('views');
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(compress());
  console.log(__dirname);
  app.use('/', express["static"](__dirname + '/../static'));
  return app.use(methodOverride());
};