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
                $timeout( () => {
                    $location.path("/login");
                }, 100)
                return;
            };
        });
    };

    $scope.deleteToken = () => {
        localStorage.clear();
        console.log(localStorage);
    }

    const showUser = () => {
        userServices.getUser()
            .then(req => {
                $scope.loading = true;
                const { name, email } = req.data
                $scope.name = name
                $scope.email = email
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
                $scope.loading = true;
                $scope.students = req.data
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