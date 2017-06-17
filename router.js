'use strict';

var musicCtrl = require('./controller/musicController.js');

exports.route = function(app) {
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/view/index.html');
    });

    app.post('/', musicCtrl.list);
};
