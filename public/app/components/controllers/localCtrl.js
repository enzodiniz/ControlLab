angular.module('ControlLab')
	.controller('localCtrl', function (localSvc, $rootScope, authSvc, $location) {
		
		var self = this;
		self.adicionando = false;
		self.locais = [];

		self.addLocal = function () {
			localSvc.addLocal(self.nome)
				.then((res) => {
					self.getLocais();
					$rootScope.$broadcast('evento', {
						alerta: 'success',
						mensagem: 'Local adicionado com sucesso.'
					})
					self.nome = "";
					self.adicionando = false;
				}, (err) => {
					$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Erro ao adicionar o local.'
					})
				})
		}

		self.getLocais = function () {
			localSvc.getLocais()
				.then((res) => {
					self.locais = res.data.result;
				}, (err) => {
					$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Erro ao obter os locais.'
					})
				})
		}

		self.removerLocal = function () {
			localSvc.removerLocal(self.id)
				.then((res) => {
					self.getLocais();
					$rootScope.$broadcast('evento', {
						alerta: 'success',
						mensagem: 'Local removido com sucesso.'
					})
					self.excluindo = false;
				}, (err) => {
					$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Falha ao remover esse local.'
					})
				})
		}

		self.mostrarAdicionar = function () {
			if (self.adicionando) 
				self.adicionando = false;
			else
				self.adicionando = true;
		}

		self.mostrarExcluir = function (id) {
			self.setId(id);
			if (self.excluindo)
				self.excluindo = false;
			else
				self.excluindo = true;
		}

		self.setId = function (id) {
			self.id = id;
		}

		if(!authSvc.isAuthed())
			$location.path('/login');
	})