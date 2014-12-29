// @ngInject
module.exports = function ($scope, db) {
  var vm = this;

  vm.load = function () {
    db.query(function (doc, emit) {
      emit(doc._rev, {
        title: doc.title,
        markdown: doc.markdown
      });

    }).then(function (result) {
      vm.items = result.rows.map(function (row) {
        return {
          id: row.id,
          rev: row.key,
          title: row.value.title,
          markdown: row.value.markdown
        };
      });
      $scope.$apply();
    });
  };

  vm.remove = function (item) {
    db.remove(item.id, item.rev);
    vm.load();
  };

  vm.load();

};
