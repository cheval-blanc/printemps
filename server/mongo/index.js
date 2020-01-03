import mongoose from 'mongoose';

import importAudioFiles from './common/audioFilesImporter';

mongoose.Promise = Promise;

mongoose.connection.on('connected', () => {
  console.log('DB Connection Established');
  importAudioFiles();
});

mongoose.connection.on('reconnected', () => {
  console.log('DB Connection Reestablished');
});

mongoose.connection.on('disconnected', () => {
  console.error('DB Connection Disconnected');
});

mongoose.connection.on('close', () => {
  console.warn('DB Connection Closed');
});

mongoose.connection.on('error', error => {
  console.error(`DB Connection Error: ${error}`);
});

export default async function() {
  try {
    const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost/printemps';

    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (e) {
    console.error(e);
  }
}
