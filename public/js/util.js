'use strict';

// http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
String.prototype.format = String.prototype.format || function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] !== 'undefined' ? args[number] : match;
    });
};

function secondsToHms(t) {
    t = Number(t);
    if(isNaN(t) || t === 0){ return '0:00'; }
    var h = Math.floor(t / 3600),
        m = Math.floor(t % 3600 / 60),
        s = Math.floor(t % 3600 % 60);

    var hms = (h>1) ? h + ':' : '';
    hms += m + ':' + ('0' + s).slice(-2);
    return hms;
}
