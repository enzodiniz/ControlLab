angular
  .module('ControlLab')
  .service('matSvc', function($http) {

  	var self = this;

  	self.getMateriais = function () {
  		return $http.get('http://localhost:3000/api/materiais')
  	}
  })