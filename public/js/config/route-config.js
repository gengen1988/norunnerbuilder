// @ngInject
module.exports = function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('master');

  $stateProvider
    .state('detail', {
      url: '/detail/:id',
      templateUrl: 'views/detail.html',
      controller: 'DetailController',
      controllerAs: 'vm',
      resolve: {
        // @ngInject
        doc: function ($stateParams, DocService) {
          return DocService.getDoc($stateParams.id);
        }
      }
    })
    .state('master', {
      url: '/master',
      templateUrl: 'views/master.html',
      controller: 'MasterController',
      controllerAs: 'vm'
    });

};
