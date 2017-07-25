angular
  .module("ControlLab")
  .controller('authCtrl', function($location, authSvc) {
    var self = this;

    self.userName = "";
    self.senha = "";

    self.handleRequest = (res) => {
      console.log("chegou no handleRequest");
      var token = res.data ? res.data.token : null;
      console.log(token);
      if (token) {
        authSvc.saveToken();
        $location.path('/home');
      }
    }
//self.handleRequest(res);
    self.autenticar = function () {
      authSvc.login(self.userName, self.senha)
        .then((res) => {
          console.log("chegou antes do token");
          var token = res.data ? res.data.token : null;
          console.log(token);
          if (token) {
            authSvc.saveToken();
            $location.path('/home');
          } else {
            console.log("token não definido.");
          }
        }, (res) => {
          console.log("chegou antes do token");
          var token = res.data ? res.data.token : null;
          console.log(token);
          if (token) {
            authSvc.saveToken();
            $location.path('/home');
          } else {
            console.log("token não definido.");
          }
        });
    }
  })
