angular.module("controlLab")
  .controller('MainController', MainCtrl)

function MainCtrl($scope, $http) {
  var self = this;

  self.getMateriais() = () => {
    $http.get('http://localhost:3000/materiais').then((res) => {
      self.materiais = res.data.result;
    }, (err) => {

    })
  }

  self.getEmprestimos = () => {
    $http.get('http://localhost:3000/emprestimos').then(function (res) {
      self.emprestimos = res.data.result;
    }, function (err) {

    })
  }

  self.getUsuarios = () => {
    $http.get('http://localhost:3000/usuarios').then((res) => {
      self.usuarios = res.data.result;
    }, (err) => {

    })
  }
}