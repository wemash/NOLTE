import asGenerator from 'src/asGenerator';

let nextRandomBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};

export default (amount) => {
  return asGenerator((aPoint) => {
    return {
      x: aPoint.x + nextRandomBetween(-amount, amount),
      y: aPoint.y + nextRandomBetween(-amount, amount)
    };
  });
};
