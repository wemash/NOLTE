import scale from 'src/transforms/scale';

describe('scale', () => {
  it('scales along the x axis', () => {
    scale(10, 0)([{x: 1, y: 1}])
      .should
      .resultIn({x: 10, y: 0});
  });

  it('scales along the y axis', () => {
    scale(0, 10)([{x: 1, y: 1}])
      .should
      .resultIn({x: 0, y: 10});
  });

  it('scales uniformly', () => {
    scale(10)([{x: 1, y: 1}])
      .should
      .resultIn({x: 10, y: 10});
  });
});
