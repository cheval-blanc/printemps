import { addHours, addSeconds, format, getHours } from 'date-fns';
import * as _ from 'lodash-es';

export function bytesToImage(format, bytes) {
  if (_.isEmpty(format) || _.isEmpty(bytes)) {
    return '';
  }

  const base64String = bytes.reduce((str, b) => {
    return str + String.fromCharCode(b);
  }, '');

  return `data:${format};base64,${window.btoa(base64String)}`;
}

export function formatSec(sec = 0) {
  sec = Number(sec);
  if (isNaN(sec) || sec < 1) {
    return '0:00';
  }

  const date = new Date(0);
  const dateUTC = addHours(date, date.getTimezoneOffset() / 60);

  const dateWithSec = addSeconds(dateUTC, sec);
  return format(dateWithSec, getHours(dateWithSec) > 0 ? 'H:mm:ss' : 'm:ss');
}

export function shuffleQueue(queue, playingIndex) {
  if (_.isEmpty(queue) || queue.length < 3) {
    return queue;
  }

  const cloned = _.cloneDeep(queue);
  const current = cloned.splice(playingIndex, 1);

  return current.concat(_.shuffle(cloned));
}

export function sortQueue(queue) {
  const cloned = _.cloneDeep(queue);
  return _.orderBy(cloned, ['trackNumber']);
}
