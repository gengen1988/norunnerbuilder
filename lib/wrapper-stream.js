var util = require('util');
var Transform = require('stream').Transform;

var Wrapper = module.exports = function (options) {
  if (!(this instanceof Wrapper)) return new Wrapper(options);
  options = options || {};

  Transform.call(this, options);
  this._begin = true;
  this._prefix = options.prefix || '';
  this._suffix = options.suffix || '';
};

util.inherits(Wrapper, Transform);

Wrapper.prototype._transform = function (chunk, encoding, callback) {
  if (this._begin) {
    this.push(this._prefix);
    this._begin = false;
  }
  this.push(chunk);
  callback();
};

Wrapper.prototype._flush = function (callback) {
  this.push(this._suffix);
  callback();
};
