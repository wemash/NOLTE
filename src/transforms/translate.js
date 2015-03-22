import asGenerator from 'src/asGenerator';

// Move a point by (tx, ty)
export default (tx, ty) => {
  return asGenerator((aPoint) => {
    return {
      x: aPoint.x + tx,
      y: aPoint.y + ty
    };
  });
};
