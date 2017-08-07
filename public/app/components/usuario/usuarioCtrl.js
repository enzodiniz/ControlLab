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

  if (!authSvc.isAuthed()){
      $location.path('/login');
  }
}
