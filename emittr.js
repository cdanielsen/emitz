'use strict';

let Emitter = function (targetObject) {
  if (!targetObject || typeof targetObject !== 'object' || Array.isArray(targetObject)) {
    throw new Error('Whoops! You must provide a target object');
  }

  let _emittr = {
    events: {},
    on: function (name, callback) {
      if (!this.events[name]) {
        this.events[name] = [];
      }
      this.events[name].push(callback);
    },
    emit: function (name, ...args) {
      if (!this.events[name]) {
        console.warn(`${name} event not registered!`);
        return null;
      } else {
        this.events[name].forEach(listener => listener(...args));
      }
    },
    off: function (name, listenerToUnregister) {
      if (!name || !listenerToUnregister) {
        console.warn('Missing required arguments');
        return null;
      }

      if (!this.events[name]) {
        console.warn(`${name} event not registered on object it was called on!`);
        return null;
      }

      if (!this.events[name].includes(listenerToUnregister)) {
        console.warn(`${listenerToUnregister.name} not a registered listener of ${name} event!`);
        return null;
      }
      this.events[name] = this.events[name].filter(registeredHandler => registeredHandler !== listenerToUnregister);
      console.log(`${listenerToUnregister.name} listener unregistered from ${name} event`);
    },
    nuke: function (name) {
      if (!name || !this.events[name]) {
        console.warn(`Missing event name or event does not exist!`);
        return null;
      }
      this.events[name] = [];
    }
  };
  return Object.assign({}, targetObject, _emittr);
};

module.exports = Emitter;
