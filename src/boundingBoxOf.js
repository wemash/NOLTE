let extract = (points, axis) => {
  return points.map((point) => { return point[axis]});
};

let min = (current, next) => {
  return next < current ? next : current;
};

let max = (current, next) => {
  return next > current ? next : current;
};

let reduce = (values, apply) => {
  return values.reduce(apply, values[0]);
};

let smallest = (points, axis) => {
  return reduce(extract(points, axis), min);
};

let largest = (points, axis) => {
  return reduce(extract(points, axis), max);
};

export default (points) => {
  let sx = smallest(points, 'x'),
      sy = smallest(points, 'y'),
      lx = largest(points, 'x'),
      ly = largest(points, 'y');
  return {
    x: sx,
    y: sy,
    width: Math.abs(lx - sx),
    height: Math.abs(ly - sy)
  };
};
