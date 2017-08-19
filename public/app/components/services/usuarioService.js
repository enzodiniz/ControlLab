angular
	.module('ControlLab')
	.service('userSvc', function ($http, authSvc) {
		
		var self = this;
		const API = 'http://localhost:3000/api/users';
		self.token = authSvc.getToken();

		self.addUser = function (pri, ult, email, userName, senha, mat, adm) {
			return $http.post(API, {
				token: self.token,
				primeiroNome: pri,
			    ultimoNome: ult,
			    email: email,
			    userName: userName,
			    senha: senha,
			    matricula: mat,
			    admin: adm
			})
		}

		self.getUsers = function (query) {
			return $http.get(API + '_busca' + '/?token=' + self.token + '&query=' + query)
		}
	})