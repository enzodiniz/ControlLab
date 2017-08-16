angular
	.module('ControlLab')
	.service('userSvc', function ($http) {

		var self = this;
		const API = 'http://localhost:3000/api/users';

		self.addUser = function (pri, ult, email, userName, senha, mat, adm) {
			return $http.post(API, {
				primeiroNome: pri,
			    ultimoNome: ult,
			    email: email,
			    userName: userName,
			    senha: senha,
			    matricula: mat,
			    admin: adm
			})
		}
	})
