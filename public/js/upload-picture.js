(function() {
webApp.controller('UploadPicController', UploadPicController);

UploadPicController.$inject = ['$scope', '$state', '$http'];
function UploadPicController($scope, $state, $http) {
    var vm = this;
    var data = new FormData();

    vm.message = null;
    vm.files = {};

    vm.processForm = function() {
        debugger;
      if (this.files.bigimage) {
          data.append('icon', this.files.bigimage);
      }
      $http({
        method: 'POST',
        transformRequest: angular.identity,
        url: '/api/upload',
        data: data,
        headers: {'Content-Type': undefined}
      }).then(function () {


      });
    };
}
})();
