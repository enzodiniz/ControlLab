angular.module('ControlLab')
	.service('recSvc', function ($http, authSvc) {
		
		var self = this;
		var token = authSvc.getToken();
		const API = 'http://localhost:3000/api/recursos';

		self.addRecurso = function (nome, val) {
			return $http.post(API, {
				token: token,
				nome: nome,
				valor: val
			})
		}

		self.obterRecurso = function () {
			return $http.get(API + '/?token=' + token)
		}

		self.removerRecurso= function (id) {
			return $http.delete(API + "/" + id + "/?token=" + token);
		}

		//ui-select de material
		self.getResources = function (query) {
			return $http.get(API + '_busca' + '/?query=' + query + '&token=' + token);
		}

		self.atualizarRec = function (id, nome, val) {
			return $http.put(API + '/' + id, {
				token: token,
				nome: nome,
				valor: val
			})
		}
})	