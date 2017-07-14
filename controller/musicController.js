'use strict';

var Music = require('../model/music.js');

exports.list = function(req, res) {
    Music.find(function(err, musics) {
        if(err) { return res.status(500).send({ error: 'Database failure' }); }
        res.json(musics);
    });
};

exports.import = function(tag) {
    var query = { album: tag.album, artist: tag.artist, title: tag.title },
        options = { upsert: true };

    Music.update(query, { $setOnInsert: tag }, options, function(err, raw) {
        if(err) { console.error(err); }
    });

};
