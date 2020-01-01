import * as util from '../util';

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

  it('queue has less than 3 elements', () => {
    const tinyQueue = [1, 2];
    expect(shuffleQueue(tinyQueue, 0)).toBe(tinyQueue);
  });

  it('queue has 5 elements', () => {
    const smallQueue = Array.from(new Array(5), (v, i) => i);
    const playingIndex = 3;

    const shuffled = shuffleQueue(smallQueue, playingIndex);
    expect(shuffled[0]).toBe(playingIndex);
    expect(shuffled[1]).not.toBe(playingIndex);
  });
});

describe('util:sortQueue()', () => {
  const { sortQueue, shuffleQueue } = util;

  it('queue is empty', () => {
    const emptyQueue = [];
    expect(sortQueue(emptyQueue, 0)).toBe(emptyQueue);
  });

  it('sort shuffled queue that has 5 elements', () => {
    const dummyQueue = Array.from(new Array(5), (v, i) => {
      return {
        trackNumber: i + 1,
        title: String.fromCharCode(i + 1),
      };
    });

    const sorted = sortQueue(shuffleQueue(dummyQueue, 0));
    expect(sorted[0].trackNumber).toBeLessThan(sorted[1].trackNumber);
  });
});
