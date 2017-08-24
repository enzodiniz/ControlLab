angular.module('ControlLab')
	.service('gpSvc', function ($http, authSvc) {
		
		var self = this;
		const API = 'http://localhost:3000/api/grupos';
		self.token = authSvc.getToken();

		self.addGrupo = function (int, nome) {
			return $http.post(API, {
				token: self.token,
				nome: nome, 
				integrantes: int
			});
		}

		self.obterGrupos = function () {
			return $http.get(API + '/?token=' + self.token);
		}

		self.getGroups = function (query) {
			return $http.get(API + '_busca' + '/?token=' + self.token + '&query=' + query);
		}

		self.removerGp = function (id) {
			return $http.delete(API + '/' + id + '/?token=' + self.token);
		}
	})