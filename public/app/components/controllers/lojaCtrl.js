angular.module('ControlLab')
	.controller('lojaCtrl', function (lojaSvc, authSvc, $location, $rootScope) {
		var self = this;

		self.obterLojas = function () {
			lojaSvc.obterLojas()
				.then((res) => {
					self.lojas = res.data.result;
				}, (err) => {
					$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Falha ao obter as lojas.'
					})
				})
		}

		self.mostrarForm = function () {
			if(self.adicionando)
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

		self.addLoja = function () {
			lojaSvc.addLoja(self.nome)
				.then((res) => {
					self.obterLojas();
					$rootScope.$broadcast('evento', {
						alerta: 'success',
						mensagem: 'Loja adicionada com sucesso.'
					})
					self.adicionando = false;
					self.nome = "";
				}, (err) => {
					$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Falha ao adicionar essa loja.'
					})
				})
		}

		self.removerLoja = function () {
			lojaSvc.removerLoja(self.id)
				.then((res) => {
					self.obterLojas();
					$rootScope.$broadcast('evento', {
						alerta: 'success',
						mensagem: 'Loja removida com sucesso.'
					})
					self.excluindo = false;
					self.editando = false;
				}, (err) => {
					$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Falha ao remover essa loja.'
					})
				})
		}

		self.atualizarLoja = function (id) {
			lojaSvc.atualizarLoja(id, self.nome)
				.then((res) => {
					self.obterLojas();
					$rootScope.$broadcast('evento', {
						alerta: 'success',
						mensagem: 'Loja alterada com sucesso.'
					})
					self.editando = false;
					self.nome = "";
				}, (err) => {
					$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Falha ao alterar essa loja.'
					})
				})
		}

		self.mostrarEditar = function () {
			if(self.editando)
				self.editando = false;
			else
				self.editando = true;
		}

		self.setId = function (id) {
			self.id = id;
		}	

		if(!authSvc.isAuthed())
			$location.path('/login');
	})