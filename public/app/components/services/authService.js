angular
  .module('ControlLab')
  .service('authSvc', function($window, $http) {

    var self = this;

    self.login = function (userName, senha) {
      return $http.post('http://localhost:3000/api/autenticacao', {
        userName: userName,
        senha: senha
      })
    }

    self.saveToken = function(token) {
  	  $window.localStorage['jwtToken'] = token;
  	}

    self.parseJwt = function(token) {
  	  var base64Url = token.split('.')[1];
  	  var base64 = base64Url.replace('-', '+').replace('_', '/');
  	  return JSON.parse($window.atob(base64));
	  }

  	self.getToken = function() {
  	  return $window.localStorage['jwtToken'];
  	}

    self.isAuthed = function () {
      var token = self.getToken();
      if (token){
        var params = self.parseJwt(token);
        return Math.round(new Date().getTime() / 1000) <= params.exp;
      } else {
        return false;
      }
    }

    self.getUid = function() {
  	  var token = self.getToken();
  	  if(token) {
  	    var params = self.parseJwt(token);
  	    return params.uid;
  	  }
	  }

    self.logout = function () {
      $window.localStorage.removeItem('jwtToken')
    }
  })
