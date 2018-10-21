'use strict';

import moment from 'moment';

export const PLAY_STATUS = 'play';
export const PAUSE_STATUS = 'pause';
export const LOADING_STATUS = 'loading spinner';
export const ERROR_STATUS = 'frown';

export function sec2Hms(t=0) {
  t = Number(t);
  if(isNaN(t) || t === 0){ return '0:00'; }

  let dur = moment.duration(t, 's');

  let h = dur.hours(),
    hrs = (h>0) ? `${h}:` : '';
  return `${hrs}${dur.minutes()}:${('0'+dur.seconds()).slice(-2)}`;
}
