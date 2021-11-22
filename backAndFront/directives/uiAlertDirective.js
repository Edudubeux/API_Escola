angular.module("listaTelefonica").directive("uiAlert", function () {
    return {
        templateUrl: "../../view/alert.html",
        replace: true,
        restrict: "",
        //existem 4 tipos de restrict: 
        // A- diretiva restrita ao atributo do elemento  
        // E- diretiva restrita ao elemento 
        // C- diretiva restrita a classe do elemento 
        // M - diretiva restrita ao comentario do elemento
        scope: {
            title: "@"
        },
        transclude: true
    }
}) 