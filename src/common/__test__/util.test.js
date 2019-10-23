import * as util from '../util';

describe('util:bytesToImage()', () => {
  const { bytesToImage } = util;

  it('format or bytes is empty', () => {
    expect(bytesToImage()).toBe('');
    expect(bytesToImage('', [])).toBe('');
    expect(bytesToImage(null, null)).toBe('');
  });

  it('format and bytes are dummy data', () => {
    const dummyFormat = 'image/png';
    const dummyBytes = [137, 80, 78, 71, 13, 10, 26, 10];

    expect(bytesToImage(dummyFormat, dummyBytes)).toBe(
      'data:image/png;base64,iVBORw0KGgo=',
    );
  });
});

describe('util:formatSec()', () => {
  const { formatSec } = util;
  const defaultValue = '0:00';

  it('sec is empty or wrong', () => {
    expect(formatSec()).toBe(defaultValue);
    expect(formatSec('$')).toBe(defaultValue);
    expect(formatSec(null)).toBe(defaultValue);
    expect(formatSec(-1)).toBe(defaultValue);
  });

  it('sec is zero', () => {
    expect(formatSec(0)).toBe(defaultValue);
  });

  it('sec is less than 1 hour', () => {
    expect(formatSec(1)).toBe('0:01');
    expect(formatSec(10)).toBe('0:10');
    expect(formatSec(60)).toBe('1:00');
    expect(formatSec(3599)).toBe('59:59');
  });

  it('sec is more than 1 hour', () => {
    const oneHour = 3600;
    expect(formatSec(oneHour)).toBe('1:00:00');
    expect(formatSec(oneHour * 10)).toBe('10:00:00');
    expect(formatSec(oneHour * 13)).toBe('13:00:00');
  });
});

describe('util:shuffleQueue()', () => {
  const { shuffleQueue } = util;

  it('queue is empty', () => {
    const emptyQueue = [];
    expect(shuffleQueue(emptyQueue, 0)).toBe(emptyQueue);
  });

  it('length of queue is less than 3', () => {
    const tinyQueue = [1, 2];
    expect(shuffleQueue(tinyQueue, 0)).toBe(tinyQueue);
  });

  it('length of queue is 5', () => {
    const smallQueue = Array.from(new Array(5), (v, i) => i);
    const playingIndex = 3;

    const shuffled = shuffleQueue(smallQueue, playingIndex);
    expect(shuffled[0]).toBe(playingIndex);
    expect(shuffled[1]).not.toBe(playingIndex);
  });
});
