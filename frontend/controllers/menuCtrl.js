app.controller("menuCtrl", function ($scope, $location, fornecedorService) {
    $scope.app = "Base de fornecedores FULL";
    $scope.msg = "Fornecedores:";

    $scope.redirectTo = page => {
        $location.path(`/${page}`)
    }

    const showFornecedores = () => {
        fornecedorService.listFornecedores()
            .then(req => {
                $scope.loading = true;
                $scope.fornecedores = req.data;
            })
            .catch(error => {
                if (error && error.data) {
                    $scope.error = error.data.error;
                    return;
                }
            })
            .finally(() => $scope.loading = false)
    };

    // const showStudents = () => {
    //     studentServices.showStudents()
    //         .then(req => {
    //             if (!req.data.length) {
    //                 $scope.noStudents = true;
    //                 $scope.message = "You don't have any Students";
    //                 return;
    //             }
    //             $scope.noStudents = false;
    //             $scope.loading = true;
    //             $scope.students = req.data.map(value => {
    //                 if (!value.photos.length) {
    //                     return value;
    //                 };
    //                 console.log(value);
    //                 value.path = '\\backend\\uploads\\' + value.photos[0].file_name.split('\\')[value.photos[0].file_name.split('\\').length - 1];
    //                 return value;
    //             });
    //             console.log($scope.students, "OLA STUDENTS");
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             return;
    //         })
    //         .finally(() => $scope.loading = false)
    // };

    // $scope.deleteStudent = id => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then(result => {
    //         if (!result.isConfirmed) {
    //             return;
    //         }
    //         studentServices.deleteStudent(id).then(showStudents);
    //     });
    // };

    showFornecedores();
});