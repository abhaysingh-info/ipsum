import { MakePluralPipe } from './make-plural.pipe';

describe('MakePluralPipe', () => {
  it('create an instance', () => {
    const pipe = new MakePluralPipe();
    expect(pipe).toBeTruthy();
  });
});
