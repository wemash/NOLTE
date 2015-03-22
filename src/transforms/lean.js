import asGenerator from 'src/asGenerator';

export default (amount) => {
  return asGenerator((aPoint) => {
    return {
      x: aPoint.x + amount * aPoint.y,
      y: aPoint.y
    };
  });
};
