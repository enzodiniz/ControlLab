angular.module('ControlLab')
	.controller('RecursoCtrl', function (recSvc, authSvc, $rootScope, $location) {
		
		var self = this;
		var adicionando = false;
		self.editados = [];

		self.addRecurso = function () {
			recSvc.addRecurso(self.nome, self.val)
				.then((res) => {
					console.log(res);
					self.mostrarForm();
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
					self.editados = [];
					for (r of self.recursos) {
					  self.editados.push({
					  	id: r._id,
					  	editado: false
					  })
					}
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
			recSvc.atualizarRec(id, self.nome, self.val)
				.then((res) => {
					if (res.data.success) {
						$rootScope.$broadcast('evento', {
							alerta: 'success',
							mensagem: 'Recurso atualizado com sucesso.'
						})
						self.mostrarEditar();
						self.obterRecurso();
					}
					console.log(res);
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

		self.mostrarEditar = function (id) {
			if (self.editando) {
				for (e of self.editados) {
				  if (e.id == id)
				  	e.editado = false;
				}
				self.editando = false;
			}
			else {
				for (e of self.editados) {
				  if (e.id == id)
				  	e.editado = true;
				}
				self.editando = true;
			}
		}

		self.setId = function (id) {
			self.id = id;
		}	

		if (!authSvc.isAuthed())
			$location.path('/login');
	})