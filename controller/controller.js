'use strict';

exports.play = function(req, res, filepath) {

    console.log(req.body.name);

    //@@
    var parts = '';
    res.on('data', function(data) {
        parts += data;
    });
    res.on('end', function(data) {
        res.set('Content-Type', 'audio/mpeg');
        res.send(new Buffer(parts, 'binary'));
    })
};
