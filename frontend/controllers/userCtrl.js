angular.module("escolinha").controller("userCtrl", function ($scope, userServices, $location, $timeout) {
  $scope.app = "School Full";
  $scope.msg = "Hello teacher, if you already have an account, sign-in up ";
  $scope.error = "";
  const teste = 'Your profile has been updated! Now you are FULL!';

  const userValidate = user => {
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

  $scope.addUser = user => {
    if (userValidate(user)) {
      return userServices.addUsers(user)
        .then(res => {
          $location.path("/login");
        })
        .catch(error => {
          console.log(error);
          $scope.error = error.data.error
        });
    };
  };

  $scope.updateUser = user => {
    userServices.updateUser(user)
    .then(() => {
      $scope.mensagem = teste;
      delete $scope.error;
      $timeout(() => {
        $location.path("/menu");
      }, 4000)
    })
    .catch(error => {
      if(error && error.data && error.data.error === "REQUIRED_FIELDS") {
        $scope.error = "Please, fill the fields."
        return;
      }
      $scope.error = error.data.error
    });
  };
});

