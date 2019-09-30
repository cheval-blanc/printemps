import * as util from '../util';

describe('util:formatSec()', () => {
  const { formatSec } = util;
  const defaultValue = '0:00';

  it('When sec is empty or wrong', () => {
    expect(formatSec()).toBe(defaultValue);
    expect(formatSec('$')).toBe(defaultValue);
    expect(formatSec(null)).toBe(defaultValue);
    expect(formatSec(-1)).toBe(defaultValue);
  });

  it('When sec is zero', () => {
    expect(formatSec(0)).toBe(defaultValue);
  });

  it('When sec is less than 1 hour', () => {
    expect(formatSec(1)).toBe('0:01');
    expect(formatSec(10)).toBe('0:10');
    expect(formatSec(60)).toBe('1:00');
    expect(formatSec(3599)).toBe('59:59');
  });

  it('When sec is more than 1 hour', () => {
    const oneHour = 3600;
    expect(formatSec(oneHour)).toBe('1:00:00');
    expect(formatSec(oneHour * 10)).toBe('10:00:00');
    expect(formatSec(oneHour * 13)).toBe('13:00:00');
  });
});
