'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//var musicSchema = new Schema({
//    title:          String,
//    artist:         String,
//    album_artist:   String,
//    composer:       String,
//    album:          String,
//    year:           Number,
//    track:          Number,
//    disc:           Number,
//    album_art:      String //@@ Buffer??
//});

var musicSchema = new Schema({
    title:  String,
    artist: String,
    album:  String,
    year:   String,
    track:  String,
    format: String,
    image:  Array
});

module.exports = mongoose.model('music', musicSchema);
