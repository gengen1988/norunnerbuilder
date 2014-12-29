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
        doc: function ($q, $stateParams, db) {
          var id = $stateParams.id;
          if (!id || id === '') {
            return {
            };
          }

          var deferred = $q.defer();
          db.get(id).then(function (doc) {
            deferred.resolve({
              id: doc._id,
              title: doc.title,
              markdown: doc.markdown,
              rev: doc._rev
            });
          });

          return deferred.promise;
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
