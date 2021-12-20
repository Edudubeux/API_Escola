angular.module("escolinha").controller("photoCtrl", function ($scope, photoServices, $routeParams) {
    $scope.app = "Add or change your photo here"

    const id = $routeParams.id;

    $scope.photo = null;

    $scope.show = () => {
        console.log($scope.photo);
    }

    $scope.add = function () {
        const file = document.getElementById('file').files[0],
            reader = new FileReader();

        reader.onloadend = function (e) {
            const data = e.target.result;
            //send your binary data via $http or $resource or do anything else with it
        }
        // fazer if para caso nao tenha nenhum file
        console.log(file.name);
        reader.readAsArrayBuffer(file);
        photoServices.addPhoto(id)
            .then(req => {
                console.log(req, "OLA REQ");
            })
            .catch(error => {
                console.log(error.data);
            })
        };
});