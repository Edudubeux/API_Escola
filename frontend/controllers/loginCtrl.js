angular.module("escolinha").controller("loginCtrl", function ($scope, loginServices, $location) {
    $scope.app = "Login";
    $scope.error = "";
    $scope.msg = "Hello teacher, haven't create an account yet, create one "

    const dataValidate = user => {

        if (!user.password && !user.email) {
            $scope.error = "Please, fill fields."
            return;
        } 
        else if (!user.email) {
            $scope.error = "Please, fill the email field."
            return;
        } else if (!user.password) {
            $scope.error = "Please, fill the password field."
            return;
        } 
        else return true;
    }

    $scope.login = user => {
        if (dataValidate(user)) {
            return loginServices.login(user)
                .then(res => {
                    loginServices.getToken(res.data.token)
                    $location.path("/menu");
                })
                .catch(error => {
                    console.log(error);
                    if (error && error.data) {
                        // $scope.error = error.data.error
                    }
                })
        }
    };
});