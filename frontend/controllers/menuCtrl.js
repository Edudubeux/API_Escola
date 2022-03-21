angular.module('Ecommerce').controller("menuCtrl", function ($scope, $location, fornecedorService, $timeout) {
    $scope.app = "Base de fornecedores FULL";
    $scope.title = "Fornecedores:";

    $scope.redirectTo = page => {
        $location.path(`/${page}`)
    }

    const showFornecedores = () => {
        $scope.loading = true;
        fornecedorService.listFornecedores()
            .then(resp => {
                $timeout(() => {
                    $scope.fornecedores = resp.data;
                });
            })
            .catch(error => {
                if (error && error.data) {
                    $scope.error = error.data.error;
                    return;
                }
            })
            .finally(() => $scope.loading = false)
    };

    const removeFornecedor = id => {
        $scope.loading = true;
        Swal.fire({
            title: 'Você tem certeza que deseja deletar esse fornecedor?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, delete!'
        }).then(result => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                ).then(() => {
                    console.log('ói');
                    fornecedorService.destroyFornecedor(id).then(showFornecedores());
                })
            }
        }).finally(() => $scope.loading = false);
    };

    const editFornecedor = id => {
        $location.path(`/editFornecedor/${id}`);
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

    $scope.removeFornecedor = removeFornecedor;
    $scope.editFornecedor = editFornecedor;
});