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

  self.isAuthed = function () {
    return authSvc.isAuthed();
  }

  $scope.$on('evento', function (erro, args) {
    self.evento = true;
    if (args.alerta == "erro"){
      self.eventClass = 'alert-danger';
    } 
    else if (args.alerta == "logado"){
      self.eventClass = 'alert-success'
    }
    else {
      self.eventClass = 'alert-info';
    }
    self.eventMessage = args.mensagem;
  })

  $scope.$on('menu', function (erro, args) {
    if (args.menu == "recurso") {
      self.menuRec = true;
    }
  })

  self.fecharAlerta = function () {
    self.evento = false;
  }

  if (!authSvc.isAuthed()){ 
    $location.path('/login');
  } 
}
