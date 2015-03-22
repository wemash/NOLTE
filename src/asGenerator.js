export default (func) => {
  return function * (stream) {
    for(let aPoint of stream) {
      yield func(aPoint);
    }
  };
};
