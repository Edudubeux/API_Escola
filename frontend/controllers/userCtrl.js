angular.module("escolinha").controller("userCtrl", function ($scope, userServices) {
  $scope.app = "Bito's school"
  $scope.msg = "Hello teacher, make your registration below."
  $scope.users = []

  $scope.addUser = function (user) {

    console.log(user);

    $scope.userForm.$setPristine()
    
    return userServices.addUsers(user)
    .then(resp => console.log(resp))
    .catch(error => console.log(error));
  }

  
})

