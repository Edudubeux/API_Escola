angular.module("escolinha").controller("userCtrl", function ($scope, userServices, $location) {
  $scope.app = "Bito's school";
  $scope.msg = "Hello teacher, if you already have an account, sign-in up ";
  $scope.error = "";

  const userValidate = (user) => {
    if (!user) {
      $scope.error = "Please, fill the fields.";
      return;
    }
    else if (!user.name && !user.email) {
      $scope.error = "Please, fill the fields name and email.";
      return;
    }
    else if (!user.name && !user.password) {
      $scope.error = "Please, fill the fields name and password.";
      return;
    }
    else if (!user.password && !user.email) {
      $scope.error = "Please, fill the fields password and email.";
      return;
    }
    else if (!user.name) {
      $scope.error = "Please, fill the name field.";
      return;
    }
    else if (!user.email) {
      $scope.error = "Please, fill the email field.";
      return;
    }
    else if (!user.password) {
      $scope.error = "Please, fill the password field.";
      return;
    }
    else return true;
  };

  $scope.addUser = function (user) {
    if (userValidate(user)) {
      return userServices.addUsers(user)
        .then(res => {
          $location.path("/menu");
        })
        .catch(error => {
          $scope.error = error.data.error
        });
    }
  }


})

