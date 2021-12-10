angular.module("escolinha").controller("studentCtrl", function ($scope, studentServices, $location, $timeout) {
    $scope.app = "School Full";

    $scope.addStudents = student => {
        studentServices.addStudents(student)
        .then(res => {
            $location.path("/menu");
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