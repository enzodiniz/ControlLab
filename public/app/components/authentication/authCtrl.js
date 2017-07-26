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
//self.handleRequest(res);
    self.autenticar = function () {
      authSvc.login(self.userName, self.senha)
        .then((res) => {
          var token = res.data ? res.data.token : null;
          if (token) {
            authSvc.saveToken(token);
            $location.path('/home');
          } else {
            console.log(res.data.mensagem);
            $rootScope.$broadcast('evento', {alerta: "erro",
              mensagem: res.data.mensagem});

            console.log("token não definido.");
          }
        }, (res) => {
          console.log("chegou antes do token");
          var token = res.data ? res.data.token : null;

          if (token) {
            authSvc.saveToken(token);
            $location.path('/home');
          } else {
            console.log("token não definido.");
            console.log(res);
          }
        });
    }

    self.fazerLogout = function () {
      authSvc.loguot();
    }
  })
