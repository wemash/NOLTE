import center from 'src/transforms/center';
import climb from 'src/transforms/climb';
import lean from 'src/transforms/lean';
import pinch from 'src/transforms/pinch';
import rotate from 'src/transforms/rotate';
import scale from 'src/transforms/scale';
import starwars from 'src/transforms/starwars';
import translate from 'src/transforms/translate';
import wave from 'src/transforms/wave';

import fromSvg from 'src/fromSvg';
import collect from 'src/collect';

let apply = (transformations, points) => {
  return transformations.reduce(
    (carry, transformation) => { return transformation(carry); },
    points);
};

let loopdeloop = (action) => {
  let theLooper = (t) => {
    action(t);
    requestAnimationFrame(theLooper);
  };
  theLooper(0);
};

let fadeOut = (ctx) => {
  let canvas = ctx.canvas,
      width = canvas.width,
      height = canvas.height;
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.globalAlpha = 0.9;
  ctx.fillStyle = '#fff';
  ctx.fillRect(
    -width / 2,
    -height / 2,
    width,
    height);
  ctx.restore();
};

let rainbow = (function * () {
  var h = 0;
  while(true) {
    yield 'hsl(' + (h = (h + 1) % 360) + ', 100%, 50%)';
  }
})();

let paths = fromSvg(document.getElementsByTagName('svg')[0], 1000),
    ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
ctx.translate(250, 250);

loopdeloop((t) => {
  let u = Math.cos(t / 1000),
      transformations = [
        center(),
        pinch(0, 0, Math.sin(u * 3)),
        // scale(Math.sin(t / 88), Math.sin(t / 147) * -1),
        // scale(1, -1),
        // starwars(Math.sin(u) * 70),
        // scale(1, -1),
        // rotate(Math.sin(u) * 360)
        wave(Math.sin(t / 1000) * 50 + 50, 10, t / 1000)
      ];

  fadeOut(ctx);
  ctx.strokeStyle = rainbow.next().value;

  for(let path of paths) {
    ctx.beginPath();
    let doApply = apply(transformations, path),
        first = doApply.next().value;
    ctx.moveTo(first.x, first.y);
    for(let aPoint of doApply) {
      ctx.lineTo(aPoint.x, aPoint.y);
    }
    ctx.stroke();
  }
});
