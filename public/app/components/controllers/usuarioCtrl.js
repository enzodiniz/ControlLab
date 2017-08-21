angular
  .module("ControlLab")
  .controller('usuarioCtrl', usuarioCtrl)

function usuarioCtrl($scope, $http, userSvc, authSvc) {
  var self = this;

<<<<<<< HEAD
  self.addUser = function () {
    userSvc.addUser(self.pri, self.ult, self.email, self.userName, self.senha, self.mat, self.adm)
      .then((res) => {
        console.log(res);

      }, (err) => {

      })
  }

  if (!authSvc.isAuthed()){
      $location.path('/login');
  }
}
=======
  self.addUsuario = function () {
    recSvc.addUsuario(self.nome, self.val)
      .then((res) => {
        console.log(res);
        self.adicionando = false;
        self.obterUsuario();
        self.nome = "";
        self.val = undefined;
      }, (err) => {
        console.log(err);
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
  })
>>>>>>> 3dcb88843759fd490fe10deab6d3273523a3530c
