import collect from 'src/collect';
import toRadians from 'src/toRadians';
import boundingBoxOf from 'src/boundingBoxOf';

export default (leanback) => {
  return function * (stream) {
    let points = collect(stream),
        box = boundingBoxOf(points),
        k = box.height * Math.tan(toRadians(90 - leanback));
    for(let aPoint of points) {
      if(aPoint.y == 0 || (aPoint.y == 0 && k == 0)) {
        yield aPoint;
      } else
        yield {
          x: k * aPoint.x / (k + aPoint.y),
          y: k * aPoint.y / (k + aPoint.y)
        };
    }
  };
};
