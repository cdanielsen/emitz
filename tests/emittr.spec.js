'use strict';

const emittr = require('../emittr.js');
const tap = require('tap');

// Test object factory
let Cat = function () {
  return {
    name: null,
    age: null,
    purr: () => console.log('purr')
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

tap.test('The #on method should...', tap => {
  tap.test('register an event on the target object\'s \'events\' object', t => {
    let testCat = Cat();
    let emittableCat = emittr(testCat);
    emittableCat.on('meow', () => {});

    t.true(emittableCat.events.hasOwnProperty('meow'));
    t.end();
  });
  tap.end();
});
