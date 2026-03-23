import { getRelativeTimeParams } from './last-updated-text';

describe('getRelativeTimeParams', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns null for falsy timestamp', () => {
    expect(getRelativeTimeParams(0)).toBeNull();
  });

  it('returns justNow when within 5 seconds', () => {
    const now = Date.now();
    jest.setSystemTime(now);
    const twoSecondsAgo = now - 2 * 1000;
    expect(getRelativeTimeParams(twoSecondsAgo)).toEqual({ key: 'updated.justNow' });
  });

  it('returns seconds format when 5–59 seconds ago', () => {
    const now = Date.now();
    jest.setSystemTime(now);
    const thirtySecondsAgo = now - 30 * 1000;
    expect(getRelativeTimeParams(thirtySecondsAgo)).toEqual({ key: 'updated.secondsAgo', count: 30 });
  });

  it('returns minutes format when 1–59 minutes ago', () => {
    const now = Date.now();
    jest.setSystemTime(now);
    const fiveMinutesAgo = now - 5 * 60 * 1000;
    expect(getRelativeTimeParams(fiveMinutesAgo)).toEqual({ key: 'updated.minutesAgo', count: 5 });
  });

  it('returns hours format when 1–23 hours ago', () => {
    const now = Date.now();
    jest.setSystemTime(now);
    const twoHoursAgo = now - 2 * 60 * 60 * 1000;
    expect(getRelativeTimeParams(twoHoursAgo)).toEqual({ key: 'updated.hoursAgo', count: 2 });
  });

  it('returns days format when 1+ days ago', () => {
    const now = Date.now();
    jest.setSystemTime(now);
    const threeDaysAgo = now - 3 * 24 * 60 * 60 * 1000;
    expect(getRelativeTimeParams(threeDaysAgo)).toEqual({ key: 'updated.daysAgo', count: 3 });
  });
});
