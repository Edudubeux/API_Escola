angular.module("listaTelefonica").controller('novoContatoCtrl', function ($scope, contatosAPI, operatorsAPI, serialGenerator, $location) {

  $scope.addContact = contact => {

    contact.serial = serialGenerator.generate()
    contact.date = new Date()
    contatosAPI.saveContatos(contact).then(() => {
      delete $scope.contact;
      $scope.contactForm.$setPristine();
      $location.path("http://127.0.0.1:5501/#/contatos")
    })
  }

  const loadOps = () => {
    operatorsAPI.getOps().then((data) => {
      $scope.ops = data.data;
    })
  }
  loadOps();
})
