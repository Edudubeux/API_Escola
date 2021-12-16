angular.module("escolinha").controller("studentCtrl", function ($scope, studentServices, $location, $timeout, $routeParams) {
    $scope.app = "School Full";
    $scope.mensagem = ""
    const msg = type => {
        return `Student ${type}! Now you are FULL!`;
    };
    $scope.error = null;
    $scope.isValid = false;
    $scope.isEdit = !!$routeParams.id;

    const id = $routeParams.id;
    const init = () => {
        if (!$scope.isEdit) {
            return;
        };

        $scope.getStudent();
    };

    $scope.getStudent = () => {
        $scope.loading = true;
        studentServices.findStudent(id)
        .then(req => {
            $scope.student = req.data;
        })
        .catch( error => {
            if (error.data && error.data.error && error.data.error === "REQUIRED_FIELDS") {
                $scope.error = "Please, fill the fields.";
                return;
            };
        })
        .finally(() => $scope.loading = false);
    };

    $scope.addStudents = student => {
        $scope.loading = true;
        studentServices.addStudents(student)
            .then(() => {
                $scope.loading = true;
                $scope.isValid = true;
                $scope.mensagem = msg("added")
                $scope.error = null
                $timeout(() => {
                    $location.path("/menu");
                }, 3000);
            })
            .catch(error => {
                if (error && error.data && error.data.error === "REQUIRED_FIELDS") {
                    $scope.error = "Please, fill the fields."
                    return;
                }
                $scope.error = error.data.error;
            })
            .finally( () => $scope.loading = false )
    };

    $scope.updateStudents = student => {
        $scope.loading = true;
        studentServices.updateStudents(id, student)
        .then( () => {
                $scope.isValid = true;
                $scope.mensagem = msg("updated")
                $scope.error = null;
                $timeout(() => {
                    $location.path("/menu")
                }, 3000);
            })
            .catch(error => {
                $scope.error = error.data.error;
            })
            .finally( () => $scope.loading = false)
    };

    init();
});