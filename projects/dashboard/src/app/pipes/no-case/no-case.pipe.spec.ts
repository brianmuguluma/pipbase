import { NoCasePipe } from './no-case.pipe';

describe('NoCasePipe', () => {
  it('create an instance', () => {
    const pipe = new NoCasePipe();
    expect(pipe).toBeTruthy();
  });
});
