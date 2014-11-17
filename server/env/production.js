'use strict';
module.exports = {
  env: 'production',
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080
};
