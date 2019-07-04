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
  albumArtBytes: {
    type: Array,
  },
  tracks: [Track.schema],
});

export default model('Album', AlbumSchema);
