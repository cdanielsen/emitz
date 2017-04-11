'use strict';

let Emitter = function (targetObject) {
  if (!targetObject || typeof targetObject !== 'object' || Array.isArray(targetObject)) {
    throw new Error('Whoops! You must provide a target object');
  }

  let emittrs = {
    on: function (name, callback) {
      console.log(name);
    }
  };

  return Object.assign({}, targetObject, emittrs);
};

module.exports = Emitter;
