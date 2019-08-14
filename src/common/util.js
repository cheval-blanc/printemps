import moment from 'moment';

export function bytesToImage(format, bytes) {
  const base64String = bytes.reduce((str, b) => {
    return (str += String.fromCharCode(b));
  }, '');
  return `data:${format};base64,${window.btoa(base64String)}`;
}

export function secToHms(sec = 0) {
  sec = Number(sec);
  if (isNaN(sec) || sec === 0) {
    return '0:00';
  }

  const dur = moment.duration(sec, 's');
  const hms = [dur.hours(), dur.minutes(), ('0' + dur.seconds()).slice(-2)];
  if (hms[0] === 0) {
    hms.shift();
  }

  return hms.join(':');
}
