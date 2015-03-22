export default (stream) => {
  let points = [];
  for(let aPoint of stream) {
    points.push(aPoint);
  }
  return points;
};
