// @ngInject
module.exports = function (DocService) {
  var vm = this;

  vm.load = function () {
    DocService.getAllDocs().then(function (docs) {
      console.log(docs);
      vm.items = docs;
    });
  };

  vm.remove = function (item) {
    DocService.removeDoc(item.id, item.rev).then(function () {
      vm.load();
    });
  };

  vm.compact = function () {
    DocService.compact();
  };

  vm.load();

};
