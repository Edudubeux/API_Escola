angular.module("escolinha").controller("userCtrl", function ($scope, userServices, $location, $timeout) {
  $scope.app = "School Full";
  $scope.msg = "Hello teacher, if you already have an account, please sign-in up ";
  $scope.error = "";
  const msg = 'Your profile has been updated! Now you are FULL!';

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

  $scope.redirectTo = page => {
    $location.path(`/${page}`)
  };

  $scope.addUser = user => {
    if (userValidate(user)) {
      console.log(user);
      return userServices.addUsers(user)
        .then( () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your profile has been saved',
            showConfirmButton: false,
            timer: 1500
          }).then( () => {
            $scope.loading = true;
            $timeout( () => {
              $location.path("/login");
            })
          })
        })
        .catch(error => {
          console.log(error);
          $scope.error = error.data.error
        })
        .finally( () => $scope.loading = false)
    };
  };

  $scope.updateUser = user => {
    userServices.updateUser(user)
    .then(() => {
      $scope.loading = true;
      $scope.mensagem = msg;
      $scope.error = null;
      $timeout(() => {
        $location.path("/menu");
      }, 350)
    })
    .catch(error => {
      if(error && error.data && error.data.error === "REQUIRED_FIELDS") {
        $scope.error = "Please, fill the fields."
        return;
      }
      $scope.error = error.data.error
    })
    .finally( () => $scope.loading = false)
  };
});

