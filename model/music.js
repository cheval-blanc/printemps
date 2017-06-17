'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var musicSchema = new Schema({
    title:          String,
    artist:         String,
    album_artist:   String,
    composer:       String,
    album:          String,
    year:           Number,
    track:          Number,
    disc:           Number,
    album_art:      String //@@ Buffer??
});

module.export = mongoose.model('music', musicSchema);
