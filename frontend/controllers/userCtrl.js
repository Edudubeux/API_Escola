angular.module("escolinha").controller("userCtrl", function ($scope, userServices, $location) {
  $scope.app = "Bito's school";
  $scope.msg = "Hello teacher, if you already have an account, sign-in up ";
  $scope.error = "";

  $scope.addUser = function (user) {

    return userServices.addUsers(user)
    .then(res => {
      $scope.userForm.$setPristine();

      $location.path("/login");
    })
    .catch( error => {
      $scope.error = error.data.error
      $scope.userForm.$setPristine();
      console.log(error)
    });
  }

  
})

