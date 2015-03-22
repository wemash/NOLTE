import center from 'src/transforms/center';

describe('center', () => {
  it('centers', () => {
    center()(
      [
        {x: 0, y: 0},
        {x: 10, y: 10}
      ])
      .should
      .resultIn(
        [
          {x: -5, y: -5},
          {x: 5, y: 5}
        ]);
  });
});
