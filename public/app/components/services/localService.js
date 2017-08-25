angular.module('ControlLab')
	.service('localSvc', localSvc)

function localSvc ($http, authSvc) {
	var self = this;
	const API = 'http://localhost:3000/api/locais';
	self.token = authSvc.getToken();

	self.addLocal = function (nome) {
		return $http.post(API, {
			token: self.token,
			nome: nome
		})
	}

	self.removerLocal = function (id) {
		return $http.delete(API + '/' + id + '/?token=' + self.token);
	}

	self.atualizarLocal = function (id) {
		return $http.put(API + '/' + id + '/?token=' + self.token);
	}

	self.getLocais = function () {
		return $http.get(API + '/?token=' + self.token);
	}

	//ui-select de material
	self.getPlaces = function (query) {
		return $http.get(API + '_busca' + '/?query=' + query + '&token=' + self.token);
	}

	self.atualizarLocal = function (id, nome) {
		return $http.put(API + '/' + id, {
			nome: nome, 
			token: self.token
		});
	}
}