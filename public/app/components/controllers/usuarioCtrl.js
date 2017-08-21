angular
  .module("ControlLab")
  .controller('usuarioCtrl', usuarioCtrl)

function usuarioCtrl($scope, $http, userSvc, authSvc) {
  var self = this;

  self.addUser = function () {
    userSvc.addUser(self.pri, self.ult, self.email, self.userName, self.senha, self.mat, self.adm)
      .then((res) => {
        console.log(res);

      }, (err) => {

      })
  }

  self.obterUsuario = function () {
    recSvc.obterUsuario()
      .then((res) => {
        self.recursos = res.data.result;
      }, (err) => {
        console.log(err);
      })
  }

  self.removerUsuario = function (id) {
    recSvc.removerUsuario(id)
      .then((res) => {
        self.obterUsuario();
      }, (err) => {
        console.log(err);
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