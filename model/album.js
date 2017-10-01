'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var musicSchema = new Schema({
    file:   String,
    title:  String,
    year:   String,
    track:  String
});

var albumSchema = new Schema({
    artist: String,
    title:  String,
    format: String,
    image:  Array,
    musics: [musicSchema]
});

module.exports = mongoose.model('album', albumSchema);
