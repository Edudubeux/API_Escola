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

    // console.log($routeParams, 'ROUTE PARAMS');

    const init = () => {
        if (!$scope.isEdit) {
            return;
        }

        getStudent();
    };

    // Criar metodo find (finOne) no controller do back
    // ver questao dos params
    //ver o $scope.loading
    // ver as coisas que mateus botou 

    const getStudent = () => {
        const data = { id };

        $scope.loading = true;

        studentServices.showStudents(data)
        .then(resp => $scope.user = resp)
        .catch( error => {
            if (error.data && error.data.error && error.data.error === "REQUIRED_FIELDS") {
                $scope.error = "Please, fill the fields.";
                return;
            };
        })
        .finally(() => $scope.loading = false);
    };

    $scope.addStudents = student => {
        studentServices.addStudents(student)
            .then(() => {
                $scope.isValid = true;
                $scope.mensagem = msg("added")
                $scope.error = null
                $timeout(() => {
                    $location.path("/menu");
                }, 4000);
            })
            .catch(error => {
                if (error && error.data && error.data.error === "REQUIRED_FIELDS") {
                    $scope.error = "Please, fill the fields."
                    return;
                }
                $scope.error = error.data.error;
            });
    };

    $scope.updateStudents = student => {
        studentServices.updateStudents(student)
            .then(() => {
                $scope.isValid = true;
                $scope.mensagem = msg("updated")
                $scope.error = null;
                $timeout(() => {
                    $location.path("/menu")
                }, 4000);
            })
            .catch(error => {
                if (error.data && error.data.error && error.data.error === "REQUIRED_FIELDS OLA") {
                    $scope.error = "Please, fill the fields.";
                    return;
                };
                $scope.error = error.data.error;
            });
    };

    init();
});