'use strict';

const path = require('path');
const albumCtrl = require('./albumController.js');

exports.route = function(app, rootPath) {
  app.get('/', (req, res) => {
    res.sendFile(path.join(rootPath, 'index.html'));
  });

  app.post('/list', albumCtrl.list);
};
