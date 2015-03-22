import rotate from 'src/transforms/rotate';

describe('rotate', () => {
  let doRotate = rotate(90);
  it('rotates', () => {
    let rotated = realize(doRotate([{x: 0, y: 1}]));
    rotated.x.should.be.closeTo(1, 0.01);
    rotated.y.should.be.closeTo(0, 0.01);
  });
});
