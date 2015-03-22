chai.should();

function realize(iterable) {
  var resultingPoints = [],
      keepIterating = true;
  while(keepIterating) {
    var next = iterable.next();
    keepIterating = !next.done;
    if(keepIterating)
      resultingPoints.push(next.value);
  }
  return (
    resultingPoints.length == 1 ?
    resultingPoints[0] :
    resultingPoints
  );
};

chai.use(function(_, utils) {
  chai.Assertion.addMethod(
    'resultIn',
    function(somePoints) {
      realize(this._obj)
        .should
        .deep
        .equal(somePoints);
    });
});
