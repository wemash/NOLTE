import asGenerator from 'src/asGenerator';

export default (first, second = undefined) => {
  second = typeof second === 'undefined' ? first : second;
  return asGenerator((aPoint) => {
    return {
      x: aPoint.x * first,
      y: aPoint.y * second
    };
  });
};
