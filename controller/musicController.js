'use strict';

var Music = require('../model/music.js');

exports.list = function(req, res) {
    Music.find(function(err, musics) {
        if(err) { return res.status(500).send({ error: 'Database failure' }); }
        res.json(musics);
    });
};
