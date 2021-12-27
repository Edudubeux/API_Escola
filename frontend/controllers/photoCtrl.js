angular.module("escolinha").controller("photoCtrl", function ($scope, fileReader, photoServices, $routeParams, $location) {
    $scope.app = "Add or change your photo here"

    const id = $routeParams.id;

    document.getElementById('photoForm').onsubmit = () => {
        const input = document.getElementById('file');
        const file = input.files[0];
        const formData = new FormData();
        formData.append('file', file);

        photoServices.addPhoto(formData, id)
            .then( () => {
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