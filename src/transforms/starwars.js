import collect from 'src/collect';
import toRadians from 'src/toRadians';
import boundingBoxOf from 'src/boundingBoxOf';

export default (leanback) => {
  return function * (stream) {
    let points = collect(stream),
        box = boundingBoxOf(points),
        k = box.height * Math.tan(toRadians(90 - leanback));
    for(var i = 0; i < points.length; i++) {
      yield {
        x: k * points[i].x / (k + points[i].y),
        y: k * points[i].y / (k + points[i].y)
      };
    }
  };
};
