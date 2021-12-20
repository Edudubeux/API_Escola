angular.module("escolinha").controller("loginCtrl", function ($scope, loginServices, $location, $timeout) {
    $scope.app = "Login";
    $scope.error = "";
    $scope.msg = "Hello teacher, haven't create an account yet, create one "

    const dataValidate = user => {
        if (!user) {
            $scope.error = "Please, fill fields."
            $scope.loading = false;
            return;
        }
        else if (!user.email) {
            $scope.error = "Please, fill the email field."
            $scope.loading = false;
            return;
        } else if (!user.password) {
            $scope.error = "Please, fill the password field."
            $scope.loading = false;
            return;
        }
        else return true;
    }

    $scope.login = user => {
        $scope.loading = true;
        if (dataValidate(user)) {
            loginServices.login(user)
                .then(req => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your login has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    }) .then( () => {
                        $timeout(() => {
                            loginServices.getToken(req.data.token)
                            $location.path("/menu");
                        })
                    })
                }).catch(error => {
                    if (error && error.data) {
                        $scope.error = error.data.error
                    }
                }).finally(() => $scope.loading = false)
        }
    };
});