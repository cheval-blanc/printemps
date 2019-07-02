import { Schema, model } from 'mongoose';

const TrackSchema = new Schema({
  trackNumber: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
});

export default model('Track', TrackSchema);
