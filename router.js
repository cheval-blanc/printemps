'use strict';

var albumCtrl = require('./controller/albumController.js');

exports.route = function(app) {
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html');
  });

  app.post('/', albumCtrl.list);
};
