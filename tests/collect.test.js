import collect from 'src/collect';

describe('collect', () => {
  it('collects', () => {
    collect(
      function * generator() {
        yield 1;
        yield 2;
        yield 3;
      }())
        .should
        .deep
        .equal([1, 2, 3]);
  });
});
