import { addHours, addSeconds, format, getHours } from 'date-fns';
import { isEmpty, cloneDeep, shuffle, orderBy } from 'lodash-es';

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
  if (isEmpty(queue) || queue.length < 3) {
    return queue;
  }

  const cloned = cloneDeep(queue);
  const current = cloned.splice(playingIndex, 1);

  return current.concat(shuffle(cloned));
}

export function sortQueue(queue) {
  if (isEmpty(queue) || queue.length < 3) {
    return queue;
  }

  const cloned = cloneDeep(queue);
  return orderBy(cloned, ['trackNumber']);
}
