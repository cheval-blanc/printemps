'use strict';

const DB_URI = 'mongodb://127.0.0.1/printemps';
var mongoose = require('mongoose');

exports.connect = function() {
    mongoose.connect(DB_URI);

    mongoose.connection.on('connected', function() {
        console.info('Succeed to get connection pool in mongoose, DB_URI is ' + DB_URI);
        updateFileList();
    });

    mongoose.connection.on('error', function(err) {
        console.error('Failed to get connection in mongoose, err is ' + err);
    });

    mongoose.connection.on('disconnected', function() {
        console.error('Database connection has disconnected.');
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.warn('Application process is going down, disconnect database connection...');
            process.exit(0);
        });
    });
};


var jsmediatags = require("jsmediatags");
var musicCtrl = require('./controller/musicController.js');

function updateFileList() {
    const root = __dirname + '/audio_files/';

    console.time('update');
//    var results = [];
    walk(root, function(err, res) {
//        results = results.concat(res);
//        console.log('fileCount:', results.length);
//
//        for(let i=0, ni=results.length; i<ni; i++) {
//            musicCtrl.import(results[i]);
//        }
        console.timeEnd('update');
    });
}


var fs = require('fs'),
    path = require('path');

function walk(dir, done) {
    var results = [];
    fs.readdir(dir, (err, list) => {
        if(err) { return done(err); }

        var pending = list.length;
        if(!pending) { return done(null, results); }

        list.forEach((file) => {
            file = path.resolve(dir, file);
            fs.stat(file, (err, stat) => {
                if(stat && stat.isDirectory()) {
                    walk(file, (err, res) => {
                        results = results.concat(res);
                        if(!--pending) { done(null, results); }
                    });
                } else {
                    //results.push(file);
                    //if(!--pending) { done(null, results); }

                    let tags = ['title', 'artist', 'album', 'year', 'track', 'genre', 'picture'];
                    new jsmediatags.Reader(file).setTagsToRead(tags).read({
                        onSuccess: function(tag) {
                            let t = tag.tags;
                            let music = {
                                title:  t.title,
                                artist: t.artist,
                                album:  t.album,
                                year:   t.year,
                                track:  t.track,
                                format: t.picture.format,
                                image:  t.picture.data
                            };
                            musicCtrl.import(music);

                            //results.push(music);
                            if(!--pending) { done(null, results); }
                        },
                        onError: function(error) {
                            console.log(':(', error.type, error.info);
                        }
                    });
                }
            });
        });
    });
}
