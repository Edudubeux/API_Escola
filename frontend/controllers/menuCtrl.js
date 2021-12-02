angular.module("escolinha").controller("menuCtrl", function ($scope, userServices) {
    $scope.app = "School Full"
    $scope.msg = "Hello "
    $scope.user = ""

    const showUser = () => {
        userServices.getUser()
        .then(req => {
            
        })
    }
    
    showUser()
});