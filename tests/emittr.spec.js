'use strict';

const emittr = require('../emittr.js');
const tap = require('tap');
const sinon = require('sinon');

// Test object factory
const Cat = function () {
  return {
    name: null,
    age: null,
    purr: () => console.log('purr')
  };
};

const setup = () => {
  let testCat = Cat();
  return emittr(testCat);
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
    let emittableCat = setup();

    t.true(emittableCat.hasOwnProperty('on'));
    t.is(typeof emittableCat.on, 'function');
    t.end();
  });

  tap.test('assign an #emit method to the object it consumes', t => {
    let emittableCat = setup();

    t.true(emittableCat.hasOwnProperty('emit'));
    t.is(typeof emittableCat.emit, 'function');
    t.end();
  });
  tap.end();
});

tap.test('The #on method should...', tap => {
  tap.test('register an event on the target object\'s \'events\' object', t => {
    let emittableCat = setup();
    emittableCat.on('meow', () => {});

    t.true(emittableCat.events.hasOwnProperty('meow'));
    t.end();
  });
  tap.end();
});

tap.test('The #emit method should...', tap => {
  tap.test('consume an event name and trigger its handler if it exists', t => {
    let emittableCat = setup();
    let listenerSpy = sinon.spy(() => { /* do something */ });
    emittableCat.on('meow', listenerSpy);
    emittableCat.emit('meow');

    t.true(listenerSpy.called);
    t.end();
  });
  tap.test('consume an event name and return null if there is no matching registered event', t => {
    let emittableCat = setup();
    let returnValue = emittableCat.emit('meow');

    t.is(returnValue, null);
    t.end();
  });
  tap.test('consume optional arguments and pass them through to the listener', t => {
    let emittableCat = setup();

    let humanReaction = 'Cool your jets, cat!';
    let props = { emotionalState: 'grumpy' };
    let reactToHiss = sinon.spy(() => { /* do something */ });

    emittableCat.on('hiss', reactToHiss);
    emittableCat.emit('hiss', humanReaction, props);

    t.true(reactToHiss.calledWith(humanReaction, props));
    t.end();
  });
  tap.end();
});
