var fs = require('fs');
var WrapperStream = require('./wrapper-stream');

module.exports = function CommonJSWrapper(req, res) {
  res.type('js');
  fs.createReadStream(__dirname + '/../public' + req.path)
    .pipe(new WrapperStream({
      prefix: 'define(function (require, exports, module) {',
      suffix: '})'
    }))
    .pipe(res);
};
