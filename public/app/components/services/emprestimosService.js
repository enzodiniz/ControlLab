angular
  .module('ControlLab')
  .service('empSvc', function($http, authSvc) {

  	var self = this;
    var token = authSvc.getToken();
  	const API = 'http://localhost:3000/api/emprestimos';

  	self.emprestar = function (mat, resp, dt) {
  		return $http.post(API, {
        token: token,
  			materiais: mat,
  			responsavel: resp,
  			data: dt
  		})
  	}

  	self.getEmprestimos = function () {
  		return $http.get(API + '/?token=' + token)
  	}
  })