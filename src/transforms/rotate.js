import asGenerator from 'src/asGenerator';
import toRadians from 'src/toRadians';

export default (degrees) => {
  let radians = toRadians(degrees),
      cos = Math.cos(radians),
      sin = Math.sin(radians);
  return asGenerator((aPoint) => {
    return {
      x: cos * aPoint.x + sin * aPoint.y,
      y: cos * aPoint.y + sin * aPoint.x * -1
    };
  });
};
