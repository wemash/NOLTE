import boundingBoxOf from 'src/boundingBoxOf';

describe('boundingBoxOf', () => {
  it('finds the bounding box', () => {
    let bbox = boundingBoxOf(
      [
        {x: 10, y: 10},
        {x: -5, y: 37},
        {x: 45, y: 38},
        {x: 15, y: 100},
        {x: 15, y: -50}
      ]);
    console.log(bbox);
    bbox
      .should
      .deep
      .equal({
        x: -5,
        y: -50,
        width: 50,
        height: 150
      });
  });
});
