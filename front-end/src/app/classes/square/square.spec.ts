import { Square } from './square';

describe('Square', () => {
  it('should create an instance', () => {
    expect(new Square("black","100px","100px")).toBeTruthy();
  });
});
