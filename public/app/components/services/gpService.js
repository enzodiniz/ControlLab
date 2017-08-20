angular.module('ControlLab')
	.service('gpSvc', function ($http, authSvc) {
		
		var self = this;
		const API = 'http://localhost:3000/api/grupos';
		self.token = authSvc.getToken();

		self.getGroups = function (query) {
			return $http.get(API + '_busca' + '/?token=' + self.token + '&query=' + query)
		}
	})