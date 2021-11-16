angular.module("listaTelefonica", []).controller('listaTelefonicaCtrl', function ($scope, contatosAPI, operatorsAPI, serialGenerator) {
  $scope.app = 'Lista Telefonica'
  $scope.contacts = [];
  $scope.ops = []
  
  const loadContacts = () => {
    contatosAPI.getContatos().then((data) => {
      $scope.contacts = data.data
    })
  }
  const loadOps = () => {
    operatorsAPI.getOps().then((data) => {
      $scope.ops = data.data;
    })
  }
  $scope.addContact = contact => {
    
    contact.serial = serialGenerator.generate()
    contact.date = new Date()
    contatosAPI.saveContatos(contact).then(() => {
      delete $scope.contact;
      $scope.contactForm.$setPristine();
      loadContacts();
    })
  }
  $scope.deleteContact = () => {
    $scope.contacts = $scope.contacts.filter((contact) => {
      if (!contact.select) return contact
    })
  }
  $scope.isContactSelected = (contacts) => {
    return contacts.some(contact => {
      return contact.select
    })
  }
  $scope.alertMsg = () => {
    alert('Olá, undefined!')
  }
  $scope.addUser = () => {
    alert('Add some users!')
  }
  $scope.orderBy = (field) => {
    $scope.orderFilter = field
    $scope.direction = !$scope.direction
  }

  loadContacts();
  loadOps();
})

