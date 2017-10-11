angular
  .module("ControlLab")
  .controller('authCtrl', function($location, $rootScope, authSvc) {
    var self = this;

    self.userName = "";
    self.senha = "";

    self.handleRequest = function (res) {
      var token = res.data ? res.data.token : null;
      if (token) {
        authSvc.saveToken(token);
        $rootScope.$broadcast('evento', { alerta: 'success', 
          mensagem: res.data.mensagem })
        $location.path('/home');
      }
      else {
        console.log(res.data.mensagem);
        $rootScope.$broadcast('evento', { alerta: "erro",
          mensagem: res.data.mensagem });
      }
    }

    self.autenticar = function () {
      authSvc.login(self.userName, self.senha)
        .then((res) => {
          self.handleRequest(res);
        }, (res) => {
          self.handleRequest(res);          
        });
    }

    self.fazerLogout = function () {
      authSvc.loguot();
    }
  })
