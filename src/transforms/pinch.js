import collect from 'src/collect';
import distancesOf from 'src/distancesOf';
import scale from 'src/transforms/scale';

export default (px, py, pinchFactor = 1) => {
  let pinchPoint = {x: px, y: py};
  return function * (stream) {
    let points = collect(stream),
        distances = distancesOf(points, pinchPoint),
        longest = distances.reduce(
          (champion, challenger) => {
            return challenger > champion ? challenger : champion
          },
          0
        );
    for(var i = 0; i < points.length; i++) {
      let scalar = Math.pow(distances[i] / longest, pinchFactor);
      yield * scale(scalar)([points[i]]);
    }
  };
};
