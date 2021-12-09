angular.module("escolinha").controller("menuCtrl", function ($scope, userServices) {
    $scope.app = "School Full"
    $scope.msg = "Hello teacher!"
    $scope.name = ""
    $scope.email = ""
    $scope.error = ""

    const showUser = () => {
        userServices.getUser()
        .then((req) => {
            const { name, email } = req.data
            $scope.name = name
            $scope.email = email
        })
        .catch((error) => {
            $scope.error = error
        });
    }
    
    showUser()
});