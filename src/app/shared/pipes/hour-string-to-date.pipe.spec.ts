import { HourStringToDatePipe } from './hour-string-to-date.pipe';

describe('HourStringToDatePipe', () => {
  it('create an instance', () => {
    const pipe = new HourStringToDatePipe();
    expect(pipe).toBeTruthy();
  });
});
