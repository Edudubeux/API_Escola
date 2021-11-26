angular.module("listaTelefonica").controller('novoContatoCtrl', function ($scope, contatosAPI, operadoras, serialGenerator, $location) {

  console.log(operadoras.data);
  // $scope.operadoras = operadoras.data;

  $scope.addContact = contact => {
    contact.serial = serialGenerator.generate()
    contact.date = new Date()
    contatosAPI.saveContatos(contact).then(() => {
      delete $scope.contact;
      $scope.contactForm.$setPristine();
      $location.path("/contatos")
    })
  }
}); 
