## emittr
A (no frills) event emitter implementation. Create standalone emitter objects, or augment an existing one.

### install

```
npm install --save emittr
```

### usage

```
const emittr = require('emittr');

let Hipster = {
  name: 'Steve',
  jeanStyle: 'overly tight'
}

let emittableHipster = emittr(Hipster);

emittableHipster.on('upAndComingBandInTown', () => {
  console.log(`I've been listening to them for years`);
});

emittableHipster.emit('upAndComingBandInTown');

// --> I've been listening to them for years
```

### api

```
#on(<event>, <handlerFn>)
```
Register a handler for a new or existing event

```
#emit(<event>, [...args])
```
Emit an event. All registered listner functions will be triggered / passed in any optional args.

```
#once(<event>, <handlerFn>)
```
Register a handler (will only be called on the first event emit)

```
#off(<event>, <handlerFn)
```
Unregister an existing handler for an existing event

```
#nuke(<event>)
```
Remove ALL listeners from the specified event

### tests

```
npm test
```
Lints the code, and runs tests with coverage report
