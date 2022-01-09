angular.module("escolinha").controller("menuCtrl", function ($scope, userServices, studentServices, $location, $timeout) {
    $scope.app = "School Full";
    $scope.msg = "Hello teacher!";
    $scope.name = "";
    $scope.email = "";
    $scope.students = [];
    $scope.noStudents = false;

    if (!localStorage.token) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "You aren't logged!",
            footer: '<a href="">Why do I have this issue?</a>'
        }).then(result => {
            if (result.isConfirmed) {
                $timeout(() => {
                    $location.path("/login");
                }, 100)
                return;
            };
        });
    };


    $scope.redirectTo = page => {
        $location.path(`/${page}`)
    }

    $scope.dislog = () => {
        localStorage.clear();
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'You log off from your account',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            $timeout(() => {
                $location.path("/login")
            })
        })
    }

    const showUser = () => {
        userServices.getUser()
            .then(req => {
                $scope.loading = true;
                const { name, email } = req.data;
                $scope.name = name;
                $scope.email = email;
            })
            .catch(error => {
                if (error && error.data) {
                    $scope.error = error.data.error;
                    return;
                }
            })
            .finally(() => $scope.loading = false)
    };

    $scope.editStudent = id => {
        $location.path(`/updateStudents/${id}`);
    };

    const showStudents = () => {
        studentServices.showStudents()
            .then(req => {
                if (!req.data.length) {
                    $scope.noStudents = true;
                    $scope.message = "You don't have any Students";
                    return;
                }
                $scope.noStudents = false;
                $scope.loading = true;
                $scope.students = req.data.map(value => {
                    if (!value.photos.length) {
                        return value;
                    };
                    console.log(value);
                    value.path = '\\backend\\uploads\\' + value.photos[0].file_name.split('\\')[value.photos[0].file_name.split('\\').length - 1];
                    return value;
                });
                console.log($scope.students, "OLA STUDENTS");
            })
            .catch(error => {
                console.log(error);
                return;
            })
            .finally(() => $scope.loading = false)
    };

    $scope.deleteStudent = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (!result.isConfirmed) {
                return;
            }
            studentServices.deleteStudent(id).then(showStudents);
        });
    };

    showUser()
    showStudents()
});