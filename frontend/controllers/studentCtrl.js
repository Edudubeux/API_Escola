angular.module("escolinha").controller("studentCtrl", function ($scope, studentServices, $location, $timeout, $routeParams, photoServices, userServices) {
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
    };

    $scope.changePhoto = () => {
        $location.path(`/changePhoto/${id}`)
    };

    $scope.deletePhoto = () => {
        photoServices.deletePhoto(id)
            .then(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your photo has been deleted!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    $timeout(() => {
                        $location.path("/menu")
                    });
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.data.error}`,
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            });
    };

    $scope.redirectTo = page => {
        $location.path(`/${page}`)
    };

    $scope.getStudent = () => {
        $scope.loading = true;
        studentServices.findStudent(id)
            .then(req => {
                const userId = req.data.user_id
                $scope.student = req.data;
                userServices.getUser()
                    .then(req => {
                        if (userId !== req.data.id) {
                            throw "This student is not yours!"
                        };
                    })
            })
            .catch(error => {
                console.log(error);

                if (error.data && error.data.error && error.data.error === "Student not found!") {
                    $location.path("/menu")
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${error.data.error}`,
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                    return;
                };
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
        studentServices.updateStudents(id, student)
            .then(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your update has been saved',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    $timeout(() => {
                        $scope.isValid = true;
                        $scope.error = null;
                        $location.path("/menu")
                    });
                });
            }).catch(error => {
                $scope.error = error.data.error;
            }).finally(() => $scope.loading = false)
    };

    init();
});