import climb from 'src/transforms/climb';

describe('climb', () => {
  it('climbs', () => {
    climb(10)([{x: 1, y: 1}])
      .should
      .resultIn({x: 1, y: 11});
    climb(10)([{x: 10, y: 1}])
      .should
      .resultIn({x: 10, y: 101});
  });
});
