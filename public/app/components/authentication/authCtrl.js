angular
  .module("ControlLab")
  .controller('authCtrl', function(authSvc) {
    var self = this;

    self.userName = "";
    self.senha = "";

    self.handleRequest = (res) => {
      var token = res.data ? res.data.token : null;
      if (token) {
        authSvc.saveToken();
        $location.path('/home');
      }
    }

    self.autenticar = function () {
      console.log('alguem aqui');
      authSvc.login(self.userName, self.senha)
        .then(self.handleRequest(res), self.handleRequest(res))
    }
  })
