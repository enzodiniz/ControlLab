angular
  .module("ControlLab")
  .controller('empCtrl', function($scope, $location, authSvc, empSvc) {

    var self = this;

    self.emprestimos = [];
    self.adicionando = false;

    self.mostrarForm = function () {
      if (self.adicionando)
        self.adicionando = false;
      else
        self.adicionando = true;
    }

    self.emprestar = function () {
      empSvc.emprestar(self.mat, self.resp, self.dt)
        .then((res) => {
          self.obterEmprestimos();
        })
    }

// TODO: implementar função de erro.
    //recuperar todos os empréstimos.
    self.obterEmprestimos = () => {
      empSvc.getEmprestimos()
        .then(function (res) {
          console.log(res);
          self.emprestimos = res.data.result;
        }, function (err) {
      
        })
    }

    //ação do botão 'sair' da barra de navegação.
    self.sair = function () {
      authSvc.loguot();
    }

    //ação do botão 'início' da barra de navegação.
    self.redirHome = function () {
      $location.path('/home');
    }

    if (!authSvc.isAuthed()){
      $location.path('/login');
    }
  })
