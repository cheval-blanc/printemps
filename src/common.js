'use strict';

export const PLAY_STATUS = 'play';
export const PAUSE_STATUS = 'pause';
export const LOADING_STATUS = 'loading spinner';
export const ERROR_STATUS = 'frown';

export function secondsToHms(t=0) {
  t = Number(t);
  if(isNaN(t) || t === 0){ return '0:00'; }
  var h = Math.floor(t / 3600),
    m = Math.floor(t % 3600 / 60),
    s = Math.floor(t % 3600 % 60);

  var hms = (h>0) ? h + ':' : '';
  hms += m + ':' + ('0' + s).slice(-2);
  return hms;
}
