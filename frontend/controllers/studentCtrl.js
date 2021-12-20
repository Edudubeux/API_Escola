angular.module("escolinha").controller("studentCtrl", function ($scope, studentServices, $location, $timeout, $routeParams) {
    $scope.app = "School Full";
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

    $scope.addPhoto = () => {
        $location.path(`/addPhoto/${id}`)
    }

    $scope.getStudent = () => {
        $scope.loading = true;
        studentServices.findStudent(id)
            .then(req => {
                $scope.student = req.data;
            })
            .catch(error => {
                if (error.data && error.data.error && error.data.error === "REQUIRED_FIELDS") {
                    $scope.error = "Please, fill the fields.";
                    return;
                };
            })
            .finally(() => $scope.loading = false);
    };

    $scope.addStudents = student => {
        $scope.loading = true;
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your profile has been saved',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            $timeout(() => {
                studentServices.addStudents(student)
                    .then(() => {
                        $scope.isValid = true;
                        $scope.error = null
                        $location.path("/menu");
                    }).catch(error => {
                        if (error && error.data && error.data.error === "REQUIRED_FIELDS") {
                            $scope.error = "Please, fill the fields."
                            return;
                        }
                        $scope.error = error.data.error;
                    })
            })
        })

    };


    $scope.updateStudents = student => {
        $scope.loading = true;

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your update has been saved',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            $timeout(() => {
                studentServices.updateStudents(id, student)
                    .then(() => {
                        $scope.isValid = true;
                        $scope.error = null;
                        $location.path("/menu")
                    }).catch(error => {
                        $scope.error = error.data.error;
                    })
            });
        })
    };

    init();
});