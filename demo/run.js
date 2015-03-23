import center from 'src/transforms/center';
import climb from 'src/transforms/climb';
import jitter from 'src/transforms/jitter';
import lean from 'src/transforms/lean';
import pinch from 'src/transforms/pinch';
import rotate from 'src/transforms/rotate';
import scale from 'src/transforms/scale';
import starwars from 'src/transforms/starwars';
import translate from 'src/transforms/translate';
import wave from 'src/transforms/wave';

import fromSvg from 'src/fromSvg';
import collect from 'src/collect';
import {distance} from 'src/distancesOf';

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
  ctx.globalAlpha = 0.01;
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
    canvas = document.getElementsByTagName('canvas')[0],
    ctx = canvas.getContext('2d');

window.paths = paths;

let doResize = () => {
  let width = document.body.clientWidth,
      height = document.body.clientHeight;
  canvas.width = width;
  canvas.height = height;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(width / 2, height / 2);
};

doResize();
window.onresize = doResize;

let screensaver = (t, u) => {
  return [
    center(),
    translate(0, Math.sin(t / 100) * 250),
    translate(Math.sin(u / 2) * 1000, Math.sin(t / 500) * 10 - 5),
    lean(Math.sin(t / 500)),
    wave(Math.sin(t / 1000) * 3, 10, t / 500)
  ];
};

let pulsating = (t, u) => {
  return [
    lean(Math.sin(t / 1000)),
    center(),
    scale(1, -1),
    starwars(Math.sin(u) * 50),
    scale(1, -1),
    wave(Math.sin(t / 1000) * 3, 10, t / 500),
    wave(Math.sin(t / 1000) + 1, 50, t / 250),
    // jitter(Math.sin(t) + 1),
    pinch(0, 0, Math.cos(t / 200) / 2)
  ];
};

let centroid = (t, u) => {
  return [
    center(),
    translate(Math.sin(t / 300) * 500 + 500, 100),
    rotate(t),
    pinch(0, 0, 5)
  ];
};

loopdeloop((t) => {
  let u = Math.cos(t / 1000),
      r = Math.sin(t / 1000) * 90,
      transformations = screensaver(t, u); // pulsating(t, u); // centroid(t, u);

      /*[
        lean(Math.sin(t / 1000)),
        center(),
        // spheroid(),
        // pinch(Math.sin(t / 200) * 50, 0, Math.sin(u * 3)),
        // scale(Math.sin(t / 88), Math.sin(t / 147) * -1),

        // translate(0, Math.sin(t / 100) * 250),
        // translate(Math.sin(u / 2) * 1000, Math.sin(t / 500) * 10 - 5),
        // rotate(Math.sin(u / 5) * 360),
        // lean(Math.sin(t / 500)),
        // rotate(r),
        scale(1, -1),
        starwars(Math.sin(u) * 50),
        scale(1, -1),
        wave(Math.sin(t / 1000) * 3, 10, t / 500),
        // rotate(r * -1)
        wave(Math.sin(t / 1000) + 1, 50, t / 250),
        // scale(Math.sin(t / 1000) * 1.5 + 1.5),
        jitter(Math.sin(t) + 1),
        // rotate(t / 10),
        pinch(0, 0, Math.cos(t / 200) / 2) // Math.sin(t / 500))
      ]; */

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

var drawing = false,
    hasPushed = false,
    movements = [],
    last = {};

let pointAt = (first, last, interval) => {
  let theDistance = distance(first, last),
      normalizedVector = {
        x: (first.x - last.x) / theDistance,
        y: (first.y - last.y) / theDistance
      };

  return {
    x: first.x + normalizedVector.x * interval,
    y: first.y + normalizedVector.y * interval
  };
};

document.body.onmousedown = (event) => {
  drawing = true;
  movements = [{x: event.x, y: event.y}];
  last = movements[0];
};

document.body.onmousemove = (event) => {
  if(drawing) {
    if(!hasPushed) {
      paths.push(movements);
      hasPushed = true;
    }

    let first = {x: event.x, y: event.y},
        theDistance = distance(first, last),
        extraPoints = theDistance / 5;

    for(var i = 0; i < extraPoints; i++) {
      let point = pointAt(first, last, i);
      movements.push(point);
    }

    last = first;
  }
};

document.body.onmouseup = (event) => {
  drawing = false;
  hasPushed = false;
};
