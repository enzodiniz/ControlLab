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

  self.redirecionarEmp = function () {
    $location.path('/emprestimos');
  }

  self.redirecionarEst = function () {
    $location.path('/estoques');
  }

  self.redirAddUser = function () {
    $location.path('/addUsuario');
  }

  self.redirAddGrupo = function () {
    $location.path('/addGrupo');
  }

  self.redirAddLoja = function () {
    $location.path('/addLoja');
  }

  self.redirAddLocal = function () {
    $location.path('/addLocal');
  }

  self.redirAddRecurso = function () {
    $location.path('/recursos')
  }

  self.isAuthed = function () {
    return authSvc.isAuthed();
  }

  self.sair = function () {
    authSvc.logout();
  }

  $scope.$on('evento', function (erro, args) {
    self.evento = true;
    if (args.alerta == "erro"){
      self.eventClass = 'alert-danger';
    }
    else if (args.alerta == "success"){
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
