angular.module("listaTelefonica").factory("contatosAPI", function ($http, config) {
  var _getContatos =  () => {
    return $http.get(config.baseURL + "/contatos")
  }
  var _saveContatos = contact => {
    return $http.post(config.baseURL + "/contatos", contact);
  }
  return {
    getContatos: _getContatos,
    saveContatos: _saveContatos
  }
});