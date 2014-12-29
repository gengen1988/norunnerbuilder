angular.module('storage', [])
  .factory('db', require('js/factories/pouchdb'));

angular.module('editor', ['ui.ace']);

angular.module('placeholder', [])
  .directive('uxHolder', require('js/directives/ux-holder'));

angular.module('route', ['ui.router'])
  .config(require('js/config/route-config'));

angular.module('markdown', ['hc.marked'])
  .config(require('js/config/markdown-config'));

angular.module('app', [
  'placeholder',
  'storage',
  'editor',
  'route',
  'markdown'
])
  .controller('DetailController', require('js/controllers/detail-controller'))
  .controller('MasterController', require('js/controllers/master-controller'));
