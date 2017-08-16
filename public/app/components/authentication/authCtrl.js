angular
  .module("ControlLab")
  .controller('authCtrl', function($location, $rootScope, authSvc) {
    var self = this;

    self.userName = "";
    self.senha = "";

    self.handleRequest = (res) => {
      console.log("chegou no handleRequest");
      var token = res.data ? res.data.token : null;
      console.log(token);
      if (token) {
        authSvc.saveToken(token);
        $location.path('/home');
      }
    }

    self.autenticar = function () {
      authSvc.login(self.userName, self.senha)
        .then((res) => {
          console.log("res data: " + res.data.admin);
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

        }, (res) => {

          var token = res.data ? res.data.token : null;

          if (token) {
            authSvc.saveToken(token);
            $rootScope.$broadcast('evento', { alerta: 'success',
              mensagem: res.data.mensagem })
            $location.path('/home');
          } else {
            console.log(res.data.mensagem);
            $rootScope.$broadcast('evento', {alerta: "erro",
              mensagem: res.data.mensagem});
          }

        });
    }

    self.fazerLogout = function () {
      authSvc.logout();
    }
  })
