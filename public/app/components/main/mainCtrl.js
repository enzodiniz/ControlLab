angular.module("ControlLab")
  .controller('MainController', MainCtrl)

function MainCtrl($scope, $http, $location,  authSvc, matSvc) {
  var self = this;

  self.getMateriais = () => {
    matSvc.getMateriais()
      .then((res) => {
        self.materiais = res.data.materiais;
      }, (err) => {

      });
  }

  // self.getUsuarios = () => {
  //   $http.get('http://localhost:3000/usuarios').then((res) => {
  //     self.usuarios = res.data.result;
  //   }, (err) => {
  //
  //   })db
  // } //serviços

  $scope.$on('evento', function (erro, args) {
    self.evento = true;
    if (args.alerta == "erro"){
      self.eventClass = 'alert-danger';
    } else {
      self.eventClass = 'alert-info';
    }
    self.eventMessage = args.mensagem;
  })

  self.fecharAlerta = function () {
    self.evento = false;
  }

  if (!authSvc.isAuthed()){
    $location.path('/login');
  }
}
