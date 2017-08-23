angular
  .module("ControlLab")
  .controller('usuarioCtrl', usuarioCtrl)

function usuarioCtrl($scope, $http, userSvc, authSvc, $rootScope) {
  var self = this;

  self.addUser = function () {
    userSvc.addUser(self.pri, self.ult, self.email, self.userName, self.senha, self.mat, self.adm)
      .then((res) => {
    
          self.obterUsuario();
          self.adicionando = false;
          self.pri= "";
          self.ult= "";
          self.email= "";
          self.userName= "";
          self.senha= "";
          self.mat= "";
          self.adm= false
         $rootScope.$broadcast('evento',{
           alerta:'success',
           mensagm: 'Usuario adicionado com sucesso.'
         })

      }, (err) => {
        $rootScope.$broadcast('evento',{
          alerta:'erro',
          mensagm: 'Falha ao adicionar o usuario.'
        })
      })
  }


  self.obterUsuario = function () {
    userSvc.obterUsuario()
      .then((res) => {
        self.users = res.data.result;
      }, (err) => {

        $rootScope.$broadcast('evento',{
          alerta:'erro',
          mensagm: 'Falha ao obter o usuario.'
        })
      })
  }


  self.removerUsuario = function (id) {
    userSvc.removerUsuario(id)
      .then((res) => {
        self.obterUsuario();
        $rootScope.$broadcast('evento',{
          alerta:'success',
          mensagm: 'Usuario removido com sucesso.'
        })

      }, (err) => {
        self.obterUsuario();

        $rootScope.$broadcast('evento',{
          alerta:'erro',
          mensagm: 'Falha ao remover usuario.'
        })
      })
  }


  self.mostrarForm = function () {
    if (self.adicionando)
      self.adicionando = false;
    else
      self.adicionando = true;
  }

  if (!authSvc.isAuthed()){
      $location.path('/login');
  }
}
