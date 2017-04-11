'use strict';

const emittr = require('../emittr.js');
const tap = require('tap');

let Cat = function () {
  return {
    name: null,
    age: null,
    meow: () => console.log('meow')
  };
};
tap.test('The emitter module should...', tap => {
  tap.test('return a function', t => {
    t.is(typeof emittr, 'function');
    t.end();
  });

  tap.test('throw an error if passed argument is missing or not an object', t => {
    t.throws(emittr);
    t.throws(() => { emittr('definitelyNotAnObject'); });
    t.throws(() => { emittr(['thisArrayIsntEither']); });
    t.throws(() => { emittr(null); });
    t.end();
  });

  tap.test('assign an #on method to the object it consumes', t => {
    let testCat = Cat();
    let emittableCat = emittr(testCat);

    t.true(emittableCat.hasOwnProperty('on'));
    t.is(typeof emittableCat.on, 'function');
    t.end();
  });
  tap.end();
});
