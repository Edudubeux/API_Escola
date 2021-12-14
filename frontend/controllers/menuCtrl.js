angular.module("escolinha").controller("menuCtrl", function ($scope, userServices, studentServices, $location) {
    $scope.app = "School Full"
    $scope.msg = "Hello teacher!"
    $scope.name = ""
    $scope.email = ""
    $scope.students = []

    const showUser = () => {
        userServices.getUser()
        .then( req => {
            const { name, email } = req.data
            $scope.name = name
            $scope.email = email
        })
        .catch((error) => {
            if (error && error.data) {
                $scope.error = error.data.error;
                return;
            }
        });
    };

    $scope.openPatient = id => {
        $location.path(`/updateStudents/${id}`);
    };

    const showStudents = () => {
        studentServices.showStudents()
        .then((req, res) => {
            $scope.students = res.data
        })
        .catch( error => {
            if (error && error.data) {
                return;
            }
        });
    };

    showUser()
    showStudents()
});