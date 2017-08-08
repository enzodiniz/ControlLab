angular
  .module('ControlLab')
  .service('empSvc', function($http) {

  	var self = this;
  	const API = 'http://localhost:3000/api/emprestimos';

  	self.emprestar = function (mat, resp, dt) {
  		return $http.post(API, {
  			materiais: mat,
  			responsavel: resp,
  			data: dt
  		})
  	}

  	self.getEmprestimos = function () {
  		return $http.get(API)
  	}
  })