webApp = angular.module('WebApp', ['ui.router']);

webApp.config(['$stateProvider', '$urlRouterProvider',
              function($stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/view/upload-picture.html',
      controller: 'UploadPicController',
      controllerAs: 'vm'
    });

}]);

webApp.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function () {
        scope.$apply(function () {
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);

