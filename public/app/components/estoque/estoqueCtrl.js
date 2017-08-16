angular
  .module("ControlLab")
  .controller('estCtrl', function($location, authSvc, ) {

    var self = this;

    //ação do botão 'sair' da barra de navegação.
    self.sair = function () {
      authSvc.logout();
    }

    //ação do botão 'início' da barra de navegação.
    self.redirHome = function () {
      $location.path('/home');
    }

    if (!authSvc.isAuthed()){
      $location.path('/login');
    }
  })
