angular.module("escolinha").controller("loginCtrl", function ($scope, loginServices, $location) {
    $scope.app = "Login";
    $scope.error = "";

    const login = user => {
        return loginServices.login(user)
            .then(res => {
                $scope.userForm.$setPristine();
                loginServices.getToken(res.data.token)
                $location.path("/menu");
            })
            .catch(error => {
                $scope.userForm.$setPristine();
                $scope.error = JSON.parse(error.data).error
                console.log(error);
            })
    };

    $scope.login = login;
});