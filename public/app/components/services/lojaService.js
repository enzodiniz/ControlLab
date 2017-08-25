angular.module('ControlLab')
	.service('lojaSvc', lojaSvc)

function lojaSvc($http, authSvc) {
	var self = this,
		token = authSvc.getToken();
	const API = 'http://localhost:3000/api/lojas';

	self.obterLojas = function () {
		return $http.get(API + '/?token=' + token);
	}

	self.addLoja = function (nome) {
		return $http.post(API, {
					token: token,
					nome: nome
				})
	}

	self.atualizarLoja = function (id, nome) {
		return $http.put(API + '/' + id, {
			nome: nome, 
			token: token
		});
	}

	//ui-select de material
	self.getStores = function (query) {
		return $http.get(API + '_busca' + '/?query=' + query + '&token=' + token);
	}

	self.removerLoja = function (id) {
		return $http.delete(API + '/' + id + '/?token=' + token);
	}
}