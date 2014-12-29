// @ngInject
module.exports = function () {
  return {
    link: function (scope, element, attrs) {
      attrs.$set('data-src', attrs.uxHolder);
      Holder.run({
        images: element[0]
      });
    }
  };
};
