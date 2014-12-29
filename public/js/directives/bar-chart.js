// @ngInject
module.exports = function () {
  var width = 960;
  var height = 500;

  return {
    restrict: 'EA',
    link: function (scope, element, attrs) {
      var svg = d3.select(element[0]).append('svg')
        .attr('width', width)
        .attr('height', height);

    }
  };
};
