angular
  .module("ControlLab")
  .controller('empCtrl', function($location, authSvc, empSvc) {

    var self = this;

    //ação do botão 'sair' da barra de navegação.
    self.sair = function () {
      authSvc.loguot();
    }

    //ação do botão 'início' da barra de navegação.
    self.redirHome = function () {
      $location.path('/home');
    }
// TODO: implementar função de erro.
    //recuperar todos os empréstimos.
    self.getEmprestimos = () => {
      empSvc.getEmprestimos()
        .then(function (res) {
          self.emprestimos = res.data.emprestimos;
        }, function (err) {
      
        })
    }

    if (!authSvc.isAuthed()){
      $location.path('/login');
    }
  })
