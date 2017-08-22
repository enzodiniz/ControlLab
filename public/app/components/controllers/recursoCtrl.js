angular.module('ControlLab')
	.controller('RecursoCtrl', function (recSvc, authSvc, $rootScope, $location) {
		
		var self = this;
		var adicionando = false;

		self.addRecurso = function () {
			recSvc.addRecurso(self.nome, self.val)
				.then((res) => {
					console.log(res);
					self.adicionando = false;
					self.obterRecurso();
					self.nome = "";
					self.val = undefined;
					$rootScope.$broadcast('evento', {
						alerta: 'success',
						mensagem: 'Recurso adicionado com sucesso.'
					})
				}, (err) => {
					$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Falha ao adicionar o recurso.'
					})
				})
		}

		self.obterRecurso = function () {
			recSvc.obterRecurso()
				.then((res) => {
					self.recursos = res.data.result;
				}, (err) => {
					$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Falha ao obter os recursos.'
					})
				})
		}

		self.removerRecurso = function (id) {
			recSvc.removerRecurso(id)
				.then((res) => {
					self.obterRecurso();
					$rootScope.$broadcast('evento', {
						alerta: 'success',
						mensagem: 'Recurso removido com sucesso.'
					})
				}, (err) => {
					$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Falha ao remover o recurso.'
					})
				})
		}

		self.mostrarForm = function () {
			if (self.adicionando)
				self.adicionando = false;
			else 
				self.adicionando = true;
		}

		if (!authSvc.isAuthed())
			$location.path('/login');
	})