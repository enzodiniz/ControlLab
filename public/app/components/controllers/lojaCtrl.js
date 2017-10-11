angular.module('ControlLab')
	.controller('lojaCtrl', function (lojaSvc, authSvc, $location, $rootScope) {
		var self = this;
		self.editados = [];

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
					$rootScope.$broadcast('evento', {
						alerta: 'success',
						mensagem: 'Loja alterada com sucesso.'
					})
					self.obterLojas();
					self.mostrarEditar(id);
					self.nome = "";
				}, (err) => {
					$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Falha ao alterar essa loja.'
					})
				})
		}

		self.mostrarEditar = function (id) {
			if(self.editando) {
				self.editando = false;
				self.editados.splice(0, 1);
				let elem = document.getElementById(id);
				elem.style.removeProperty("font-size");
				elem.style.removeProperty("border-color");
				elem.style.removeProperty("column-fill");
				elem.style.removeProperty("background-color");

				let btEdit = document.getElementById("btEd" + id);
				btEdit.style.removeProperty("opacity");

				let btDel = document.getElementById("btEx" + id);
				btDel.style.removeProperty("opacity");
			}
			else {
				self.editando = true;
				self.editados.push(id);
				let elem = document.getElementById(id);
				elem.style.fontSize = "16px";
				elem.style.borderColor = "rgba(127, 127, 127, 0.5)";
				elem.style.columnFill = "rgba(127, 127, 127, 0.5)";
				elem.style.backgroundColor = "rgba(225, 229, 234, 0.5)";

				let btEdit = document.getElementById("btEd" + id);
				btEdit.style.opacity = "1";

				let btDel = document.getElementById("btEx" + id);
				btDel.style.opacity = "1";
			}
		}

		self.setId = function (id) {
			self.id = id;
		}

		if(!authSvc.isAuthed())
			$location.path('/login');
	})
