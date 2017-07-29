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

    if (!authSvc.isAuthed()) {
      $location.path('/login');
    }
  })
