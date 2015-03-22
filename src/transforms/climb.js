import asGenerator from 'src/asGenerator';

export default (amount) => {
  return asGenerator((aPoint) => {
    return {
      x: aPoint.x,
      y: aPoint.y + amount * aPoint.x
    };
  });
};
