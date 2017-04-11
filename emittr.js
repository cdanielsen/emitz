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
    }
  };

  return Object.assign({}, targetObject, _emittr);
};

module.exports = Emitter;
