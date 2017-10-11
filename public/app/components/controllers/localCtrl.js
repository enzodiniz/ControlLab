angular.module('ControlLab')
	.controller('localCtrl', function (localSvc, $rootScope, authSvc, $location) {
		
		var self = this;
		self.adicionando = false;
		self.locais = [];
		self.editados = [];

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
					self.editando = false;
				}, (err) => {
					$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Falha ao remover esse local.'
					})
				})
		}

		self.atualizarLocal = function (id) {
			localSvc.atualizarLocal(id, self.nome)
				.then((res) => {
					$rootScope.$broadcast('evento', {
						alerta: 'success',
						mensagem: 'Local alterado com sucesso.'
					})
					self.nome = "";
					self.mostrarEditar(id);
					self.getLocais();
				}, (err) => {
					$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Falha ao alterar esse local.'
					})
				})
		}

		self.mostrarEditar = function (id) {
			if(self.editando) {
				self.editados.splice(0, 1);
				self.editando = false;
			}
			else {
				self.editando = true;
				self.editados.push(id);
			}
			console.log("locais editados: ", self.editados);
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