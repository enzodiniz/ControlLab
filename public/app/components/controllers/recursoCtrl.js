angular.module('ControlLab')
	.controller('RecursoCtrl', function (recSvc, authSvc) {
		
		var self = this;
		var adicionando = false;

		self.addRecurso = function () {
			recSvc.addRecurso(self.nome, self.val)
				.then((res) => {
					console.log(res);
					self.adicionando = false;
					self.obterRecurso();
				}, (err) => {
					console.log(err);
				})
		}

		self.obterRecurso = function () {
			recSvc.obterRecurso()
				.then((res) => {
					self.recursos = res.data.result;
				}, (err) => {
					console.log(err);
				})
		}

		self.removerRecurso = function (id) {
			recSvc.removerRecurso(id)
				.then((res) => {
					self.obterRecurso();
				}, (err) => {
					console.log(err);
				})
		}

		self.mostrarForm = function () {
			if (self.adicionando)
				self.adicionando = false;
			else 
				self.adicionando = true;
		}
	})