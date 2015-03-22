import collect from 'src/collect';
import boundingBoxOf from 'src/boundingBoxOf';
import translate from 'src/transforms/translate';

export default () => {
  return function * (stream) {
    let points = collect(stream),
        box = boundingBoxOf(points);
    yield * translate(
      (box.x + box.width / 2) * -1,
      (box.y + box.height / 2) * -1)
      (points);
  };
};
