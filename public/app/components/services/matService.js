angular.module("ControlLab")
	.service("matSvc", matSvc)

function matSvc($http, authSvc) {
	var self = this,
		token = authSvc.getToken();
	const API = "http://localhost:3000/api/materiais/";

	self.obterMateriais = function () {
		return $http.get(API + "/?token=" + token);
	}

	self.obterMaterial = function (id) {
		return $http.get(API + id + "/?token=" + token);
	}

	self.getMaterials = function (query) {
		return $http.get(API + 'busca' + "/?token=" + token + '&query=' + query);
	}
}