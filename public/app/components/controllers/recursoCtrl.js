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

		self.removerRecurso = function () {
			recSvc.removerRecurso(self.id)
				.then((res) => {
					self.obterRecurso();
					$rootScope.$broadcast('evento', {
						alerta: 'success',
						mensagem: 'Recurso removido com sucesso.'
					})
					self.excluindo = false;
				}, (err) => {
					$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Falha ao remover o recurso.'
					})
				})
		}

		self.atualizarRec = function (id) {
			recSvc.atualizarRec(id)
				.then((res) => {
					if (res.data.success) {
						self.obterRecurso();
						$rootScope.$broadcast('evento', {
							alerta: 'success',
							mensagem: 'Recurso atualizado com sucesso.'
						})
					}
				}, (err) => {
					$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Falha ao atualizar esse recurso.'
					})
				})
		}

		self.mostrarForm = function () {
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

		self.mostrarEditar = function () {
			if (self.editando)
				self.editando = false;
			else
				self.editando = true;
		}

		self.setId = function (id) {
			self.id = id;
		}	

		if (!authSvc.isAuthed())
			$location.path('/login');
	})