angular.module("controlLab", []) //ui-select
  .controller('MainController', MainCtrl)

function MainCtrl($scope, $http) {
  var self = this;
  this.texto = "";
  this.numeros = [];
  this.adicionar = function(){
    if(this.numeros.indexOf(this.texto)== -1){
    this.numeros.push({
      texto: this.texto,
      timestamp:new Date()

        });
    this.texto =""
}
  }

  this.remover = function(i) {
    this.numeros.splice(i, 1);

  }


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
