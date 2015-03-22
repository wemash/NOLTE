import collect from 'src/collect';
import boundingBoxOf from 'src/boundingBoxOf';

export default (frequency, amplitude, offset = 0) => {
  return function * (stream) {
    let points = collect(stream),
        box = boundingBoxOf(points);
    for(let aPoint of points) {
      let percentage = (aPoint.x - box.x) / box.width;
      yield {
        x: aPoint.x,
        y: aPoint.y + amplitude * Math.sin(offset + percentage * frequency * Math.PI * 2)
      };
    }
  }
};
