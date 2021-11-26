angular.module("listaTelefonica").config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    
    $routeProvider.when("/contatos", {
        templateUrl: "../../view/contacts.html",
        controller: "listaTelefonicaCtrl"
    });
    
    $routeProvider.when("/", {
        templateUrl: "../../view/inicial.html"
    });

    $routeProvider.when("/novoContato",  {
        templateUrl: "../../view/newContact.html",
        controller: "novoContatoCtrl",
        resolve: {
            operadoras: function (operadoras) {
                return operadoras.loadOps();
            }
        }
    });

    $routeProvider.otherwise({
        redirectTo: "/"
    });
});