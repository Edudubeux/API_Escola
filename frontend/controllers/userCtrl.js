angular.module("escolinha").controller("loginPageCtrl", function ($scope, userServices) {
  $scope.app = 'Sign-in'
  $scope.msg = "Hello teacher, make your registration below."
  $scope.users = []

  $scope.addUser = function (user) {
    console.log(user, 'user');

    return userServices.addUsers(user).then(resp => console.log(resp)).catch(error => console.log(error));
    // userServices.addUsers(user).then(function (data) {
    //   $scope.contactForm.$setPristine()
    // })
  }
})

