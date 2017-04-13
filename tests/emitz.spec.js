'use strict';

const emitz = require('../emitz.js');
const tap = require('tap');
const sinon = require('sinon');

// Setup helpers
const Cat = function () {
  return {
    name: 'Chester',
    age: 10
  };
};

const setup = () => {
  let testCat = Cat();
  return emitz(testCat);
};

// Silence non-error/log console output when running tests
// Comment out for debugging
console.warn = function () {};
console.info = function () {};

// Tests
tap.test('The emitter module should...', tap => {
  tap.test('return a function', t => {
    t.is(typeof emitz, 'function');
    t.end();
  });

  tap.test('throw an error if passed argument is not an object', t => {
    t.throws(() => { emitz('definitelyNotAnObject'); });
    t.throws(() => { emitz(['thisArrayIsntEither']); });
    t.throws(() => { emitz(null); });
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
  tap.test('register multiple events', t => {
    let emittableCat = setup();
    let handler1 = () => { /* do something */ };
    let handler2 = () => { /* do something else */ };

    emittableCat.on('meow', handler1);
    emittableCat.on('meow', handler2);

    t.is(emittableCat.events['meow'].length, 2);
    t.end();
  });
  tap.end();
});

tap.test('The #once method should...', tap => {
  tap.test('register an event on the target object\'s \'events\' object', t => {
    let emittableCat = setup();
    emittableCat.once('meow', () => {});

    t.true(emittableCat.events.hasOwnProperty('meow'));
    t.end();
  });
  tap.test('register an event that fires only after the first emit', t => {
    let emittableCat = setup();
    let oneTimerSpy = sinon.spy(() => { console.info('There can only be one'); });
    emittableCat.once('meow', oneTimerSpy);
    emittableCat.emit('meow');
    emittableCat.emit('meow');
    emittableCat.emit('meow');

    t.is(oneTimerSpy.callCount, 1);
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

tap.test('The #off method should...', tap => {
  tap.test('return with a warning if required arguments are missing', t => {
    let emittableCat = setup();
    let returnValue = emittableCat.off();

    t.is(returnValue, null);
    t.end();
  });
  tap.test('consume an event name and a listener, and return with a warning if the event does not exist', t => {
    let emittableCat = setup();
    let unRegisteredHandler = () => { /* do something */ };
    let returnValue = emittableCat.off('scratch', unRegisteredHandler);

    t.is(returnValue, null);
    t.end();
  });
  tap.test('consume an existing event name and a listener, and return with a warning if the listener does not exist', t => {
    let emittableCat = setup();
    let handler = () => { /* do something */ };
    let unRegisteredHandler = () => { /* do something else */ };
    emittableCat.on('hiss', handler);
    emittableCat.off('hiss', unRegisteredHandler);
    t.end();
  });
  tap.test('consume an existing event name and a registered listner of that event, and unregister it from the event', t => {
    let emittableCat = setup();
    let handler = () => { /* do something */ };

    emittableCat.on('hiss', handler);
    t.true(emittableCat.events['hiss'].includes(handler));

    emittableCat.off('hiss', handler);
    t.false(emittableCat.events['hiss'].includes(handler));
    t.end();
  });
  tap.end();
});

tap.test('The #nuke method should...', tap => {
  tap.test('consume an event name, and return with a warning if the event does not exist', t => {
    let emittableCat = setup();
    let returnValue = emittableCat.nuke('stretch');

    t.is(returnValue, null);
    t.end();
  });
  tap.test('consume an existing event name, and remove any registered handlers', t => {
    let emittableCat = setup();
    let handler1 = () => { /* do something */ };
    let handler2 = () => { /* do something else */ };

    emittableCat.on('scratch', handler1);
    emittableCat.on('scratch', handler2);
    emittableCat.nuke('scratch');

    t.is(emittableCat.events['scratch'].length, 0);
    t.end();
  });
  tap.end();
});
