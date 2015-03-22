export default (svgElement, resolution) => {
  if(resolution <= 0)
    throw 'Nope, I cannot get 0 or fewer points from an SVG element';

  let toArray = (thing) => {
    return (
      Array
        .prototype
        .slice
        .call(thing));
  };

  return toArray(
    svgElement.getElementsByTagName('path'))
    .map((path) => {
      let length = path.getTotalLength(),
          points = [];

      for(var i = 0; i < resolution; i++) {
        points.push(
          path.getPointAtLength(length / resolution * i));
      }
      return points;
    });
};
