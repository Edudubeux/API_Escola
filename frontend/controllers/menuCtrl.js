angular.module("escolinha").controller("menuCtrl", function ($scope, userServices, studentServices, $location) {
    $scope.app = "School Full"
    $scope.msg = "Hello teacher!"
    $scope.name = ""
    $scope.email = ""
    $scope.error = ""
    $scope.students = []

    const showUser = () => {
        userServices.getUser()
        .then((req) => {
            const { name, email } = req.data
            $scope.name = name
            $scope.email = email
        })
        .catch((error) => {
            $scope.error = error
        });
    };

    const openPatient = id => {
        $location.path(`updateStudents/${id}`);
    };

    const showStudents = () => {
        studentServices.showStudents()
        .then(res => {
            console.log(res.data);
            $scope.students = res.data
        })
        .catch( error => {
            if (error && error.data) {
                $scope.error = error.data.error;
                return;
            }
        });
    };

    showUser(),
    showStudents()
    $scope.openPatient = openPatient;
});