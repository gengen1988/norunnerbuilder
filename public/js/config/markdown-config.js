var renderer = require('js/marked-renderer/bootstrap-marked-renderer');

// @ngInject
module.exports = function (markedProvider) {

  markedProvider.setOptions({
    renderer: renderer
  });

};
