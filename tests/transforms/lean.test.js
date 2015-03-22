import lean from 'src/transforms/lean';

describe('lean', () => {
  it('leans', () => {
    lean(10)([{x: 1, y: 1}])
      .should
      .resultIn({x: 11, y: 1});
    lean(10)([{x: 1, y: 10}])
      .should
      .resultIn({x: 101, y: 10});
  });
});
