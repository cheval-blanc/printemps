'use strict';

var mongoose = require('mongoose'),
    dbURI = 'mongodb://127.0.0.1/printemps';

exports.connect = function() {
    mongoose.connect(dbURI);

    mongoose.connection.on('connected', function() {
        console.info('Succeed to get connection pool in mongoose, dbURI is ' + dbURI);
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

//@@ Use I3D lib to loading artist_album images
function updateFileList() {
    const root = __dirname + '/audio_files/';
    
}
