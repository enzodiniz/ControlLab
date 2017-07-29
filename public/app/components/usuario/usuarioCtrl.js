angular
  .module("ControlLab")
  .controller('usuarioCtrl', usuarioCtrl)

function usuarioCtrl($scope, $http) {
  var self = this;

  self.getUsuarios = function (res) {
    $http.get('http://localhost:3000/users')
      .then(function () {
        self.usuarios = res.data.result
      }, function (err) {

      })
  }

  if (!authSvc.isAuthed()){
      $location.path('/login');
  }
}
