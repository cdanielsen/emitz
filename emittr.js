'use strict';

let Emitter = function (targetObject) {
  if (!targetObject || typeof targetObject !== 'object' || Array.isArray(targetObject)) {
    throw new Error('Whoops! You must provide a target object');
  }

  let _emittr = {
    events: {},
    on: function (name, callback) {
      this.events[name] = [];
      this.events[name].push(callback);
    },
    emit: function (name, ...args) {
      if (!this.events[name]) {
        console.info(`${name} event not registered!`);
        return null;
      } else {
        this.events[name].forEach(listener => listener(...args));
      }
    }
  };
  // targetObject._emittr = _emittr;
  return Object.assign({}, targetObject, _emittr);
};

module.exports = Emitter;
