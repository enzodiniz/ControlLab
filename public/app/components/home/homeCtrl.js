angular
  .module("ControlLab")
  .controller("homeCtrl", function($location, authSvc) {

    var self = this;

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

    self.sair = function () {
      authSvc.loguot();
    }

    if (!authSvc.isAuthed()) {
      $location.path('/login');
    }
  })
