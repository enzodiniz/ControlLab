angular
  .module("ControlLab")
  .controller("homeCtrl", function($location, authSvc, matSvc, empSvc) {

    var self = this;

    self.getMateriais = function () {
      matSvc.obterMateriais()
        .then((res) => {
          self.materiais = res.data.result;
        })
    }

    self.getEmprestimos = function () {
      empSvc.getEmprestimos()
        .then((res) => {
          self.emprestimos = res.data.result;
          console.log("emprestimos", self.emprestimos);
        })
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

    self.sair = function () {
      authSvc.logout();
    }

    if (!authSvc.isAuthed()) {
      $location.path('/login');
    }
  })
