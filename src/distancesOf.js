let distance = (a, b) => {
  return Math.sqrt(
    Math.pow(b.x - a.x, 2) +
    Math.pow(b.y - a.y, 2));
};

export default (points, referencePoint) => {
  return points.map((point) => {
    return distance(referencePoint, point);
  });
};
