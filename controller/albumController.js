'use strict';

var Album = require('../model/album.js');

exports.list = function(req, res) {
  Album.find().sort({ artist: 1, title: 1 }).exec((err, albums) => {
    if(err) { return res.status(500).send({ error: 'Database failure' }); }
    res.json(albums);
  });
};

exports.import = function(albums) {
  for(var key in albums) {
    let album = albums[key],
      query = { artist: album.artist, title: album.title };

    Album.update(query, { $setOnInsert: album }, { upsert: true }, (err, raw) => {
      if(err) { throw err; }
    });
  }
};
