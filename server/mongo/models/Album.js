import { Schema, model } from 'mongoose';

import Track from './Track';

const AlbumSchema = new Schema({
  artist: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  albumArtFormat: {
    type: String,
  },
  albumArtImage: {
    type: Array,
  },
  tracks: [Track],
});

export default model('Album', AlbumSchema);
