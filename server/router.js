'use strict';

var albumCtrl = require('./albumController.js');

exports.route = function(app, rootPath) {
  app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/view/index.html');
    // res.sendFile(__dirname + '/index.html');
    res.sendFile(rootPath + '/index.html');
  });

  app.post('/list', albumCtrl.list);
};
