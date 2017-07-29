angular
  .module('ControlLab')
  .service('empSvc', function($http) {

  	var self = this;

  	self.getEmprestimos = function () {
  		return $http.get('http://localhost:3000/api/emprestimos')
  	}
  })