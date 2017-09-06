var express = require('express');
var path = require('path');

module.exports = function(sails) {
  // @NOTE: mimicing express static middleware to be able to use it for
  //        non-proper request (sockets and `sails.request`)

  var dir = path.resolve(__dirname, '../..');
  var middleware = express.static(dir);

  return {
    routes: {
      before: {
        '/public/*': function() {
            return middleware.apply(middleware, arguments);
        },
      },
    },
  };
};
