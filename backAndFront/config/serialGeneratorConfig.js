angular.module("listaTelefonica").controller("serialGeneratorController", function (serialGeneratorProvider) {
    serialGeneratorProvider.setLength(5);
})