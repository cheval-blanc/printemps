'use strict';

const DB_URI = 'mongodb://127.0.0.1/printemps';
const mongoose = require('mongoose');

const fs = require('fs'),
  path = require('path'),
  jsmediatags = require("jsmediatags");

const albumCtrl = require('./albumController.js');
let root = null;

exports.connect = function(audioPath) {
  root = audioPath;
  mongoose.connect(DB_URI, { useMongoClient: true });

  let db = mongoose.connection;
  db.on('connected', () => {
    console.info(`Succeed to get connection pool in mongoose, DB_URI is ${DB_URI}`);
    updateFileList();
  });

  db.on('error', err => {
    console.error(`Failed to get connection in mongoose, err is ${err}`);
  });

  db.on('disconnected', () => {
    console.error('Database connection has disconnected.');
  });

  process.on('SIGINT', () => {
    db.close(() => {
      console.warn('Application process is going down, disconnect database connection...');
      process.exit(0);
    });
  });
};

function updateFileList() {
  console.time('albumCtrl.import');

  let albums = {};
  walkDirectory(root, albums, err => {
    if(err) { throw err; }
    albumCtrl.import(albums);

    console.timeEnd('albumCtrl.import');
  });
}

function getMediaTags(file, callback) {
  let tags = ['title', 'artist', 'album', 'year', 'track', 'genre', 'picture'];
  new jsmediatags.Reader(file).setTagsToRead(tags).read({
    onSuccess: callback,
    onError: err => { throw err; }
  });
}

// https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
function walkDirectory(dir, albums, done) {
  fs.readdir(dir, (err, list) => {
    if(err) { throw err; }
    let pending = list.length;
    if(!pending) { return done(null); }

    for(let i=0, ni=list.length; i<ni; i++) {
      let file = path.resolve(dir, list[i]);
      fs.stat(file, (err, stat) => {
        if(stat && stat.isDirectory()) {
          walkDirectory(file, albums, (err) => {
            if(!--pending) { done(null); }
          });
        } else {
          getMediaTags(file, tag => {
            let _t = tag.tags,
              key = _t.artist+'@'+_t.album;

            albums[key] = albums[key] || {
              artist: _t.artist,
              title: _t.album,
              format: _t.picture.format,
              image: _t.picture.data,
              musics: []
            };

            albums[key].musics.push({
              file: file.replace(root, ''),//file.replace(/^.*[\\\/]/, ''),
              title: _t.title,
              year: _t.year,
              track: _t.track
            });

            if(!--pending) { done(null); }
          });
        }
      });
    }
  });
}
