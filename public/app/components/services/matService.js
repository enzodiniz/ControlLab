angular.module("ControlLab")
	.service("matSvc", matSvc)

function matSvc($http, authSvc) {
	var self = this,
		token = authSvc.getToken();
	const API = "http://localhost:3000/api/materiais";

	self.addMaterial = function (dt, desc, local, rec, loja, quant, val) {
		return $http.post(API, {
			token: token,
			data: dt,
			descricao: desc,
			local: local,
			recurso: rec,
			loja: loja,
			quantidade: quant, 
			valorUnit: val
		})
	}

	self.obterMateriais = function () {
		return $http.get(API + "/?token=" + token);
	}

	self.obterMaterial = function (id) {
		return $http.get(API + '/' + id + "/?token=" + token);
	}

	self.getMaterials = function (query) {
		return $http.get(API + '_busca' + 
			"/?token=" + token + '&query=' + query);
	}

	self.removerMaterial = function (id) {
		return $http.delete(API + '/' + id + '/?token=' + token);
	}
}