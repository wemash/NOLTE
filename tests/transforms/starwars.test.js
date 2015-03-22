import starwars from 'src/transforms/starwars';

describe('starwars', () => {
  it('does not transform points with no y magnitude', () => {
    starwars(10)
      ([
        {x: 0, y: 0},
        {x: 10, y: 10}
      ])
      .next()
      .value
      .should
      .deep
      .equal({x: 0, y: 0});
  });

  it('does not lean the points back if leanback is 0', () => {
    starwars(0)
      ([
        {x: 1, y: 1},
        {x: 10, y: 10}
      ])
      .next()
      .value
      .should
      .deep
      .equal({x: 1, y: 1});
  });

  it('leans points back up to 90º', () => {
    starwars(90)
      ([
        {x: 1, y: 1},
        {x: 10, y: 10}
      ])
      .next()
      .value
      .should
      .deep
      .equal({x: 0, y: 0});
  });

  it('leans points back', () => {
    var newPoint =
      starwars(45)
      ([
        {x: 1, y: 10},
        {x: 0, y: 0}
      ])
      .next()
      .value;
    newPoint.x.should.be.closeTo(0.5, 0.1);
    newPoint.y.should.be.closeTo(5, 0.1);
  });
});
