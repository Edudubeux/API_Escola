angular.module("escolinha").controller("loginCtrl", function ($scope, loginServices, $location) {
    $scope.app = "Login";
    $scope.error = "";

    const dataValidate = user => {
        if (!user.email) {
            $scope.error = "Please, fill the email field."
            return;
        } else if (!user.password) {
            $scope.error = "Please, fill the password field."
            return;
        }
        else return true;
    }

    const login = user => {
        if (dataValidate(user)) {
            return loginServices.login(user)
                .then(res => {
                    loginServices.getToken(res.data.token)
                    $location.path("/menu");
                })
                .catch(error => {
                    $scope.error = error.data.error
                })
        }
    };

    $scope.login = login;
});