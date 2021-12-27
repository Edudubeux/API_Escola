angular.module("escolinha").controller("photoChangeCtrl", function ($scope, fileReader, photoServices, $routeParams, $location) {
  $scope.app = "Change your photo here";

  const id = $routeParams.id;

  document.getElementById('changePhotoForm').onsubmit = () => {
    const input = document.getElementById('changeFile');
    const file = input.files[0];
    const formData = new FormData();
    formData.append('file', file);

    photoServices.updatePhoto(formData, id)
      .then(() => {
        $location.path("/menu")
      })
      .catch(error => {
        console.log(error, "OLA ERROR");
      });
  };

  $scope.getFile = function () {
    $scope.progress = 0;
    fileReader.readAsDataUrl($scope.file, $scope)
      .then(function (result) {
        $scope.imageSrc = result;
      });
  };

  $scope.$on("fileProgress", function (e, progress) {
    $scope.progress = progress.loaded / progress.total;
  });
});