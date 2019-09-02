import { addHours, addSeconds, format, getHours } from 'date-fns';
import { cloneDeep, shuffle, orderBy } from 'lodash-es';

export function bytesToImage(format, bytes) {
  const base64String = bytes.reduce((str, b) => {
    return str + String.fromCharCode(b);
  }, '');

  return `data:${format};base64,${window.btoa(base64String)}`;
}

export function formatSec(sec = 0) {
  sec = Number(sec);
  if (isNaN(sec) || sec === 0) {
    return '0:00';
  }

  const date = new Date(0);
  const dateUTC = addHours(date, date.getTimezoneOffset() / 60);

  const dateWithSec = addSeconds(dateUTC, sec);
  return format(dateWithSec, getHours(dateWithSec) > 1 ? 'h:mm:ss' : 'm:ss');
}

export function shuffleQueue(queue, playingIndex) {
  const cloned = cloneDeep(queue);
  const current = cloned.splice(playingIndex, 1);

  return current.concat(shuffle(cloned));
}

export function sortQueue(queue) {
  const cloned = cloneDeep(queue);
  return orderBy(cloned, ['trackNumber']);
}
