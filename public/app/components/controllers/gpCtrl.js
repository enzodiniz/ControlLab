angular.module('ControlLab')
	.controller('gpCtrl', gpCtrl)

function gpCtrl(authSvc, $location,  $rootScope, gpSvc, userSvc) {
 	var self = this;

 	self.addGrupo = function () {
 		gpSvc.addGrupo (self.integrantes, self.nome)
 			.then((res) => {
 				if (res.data.success) {
 					$rootScope.$broadcast('evento',{
						alerta:'success',
						mensagem: 'Grupo adicionado com sucesso.'
					})
					self.obterGrupos();
					self.nome = "";
					self.integrantes = undefined;
					self.adicionando = false;
 				}
 			}, (err) => {
 				$rootScope.$broadcast('evento',{
					alerta:'erro',
					mensagem: 'Falha ao adicionar o grupo.'
				})
 			})
 	}
//  self.addGp = function () {
//  gpSvc.addGp(self.integrantes, self.nome )
// .then((res) => {

// self.obterGp();
// self.integrantes = "";
// self.nome = "";

// $rootScope.$broadcast('evento',{
// 	alerta:'success',
// 	mensagm: 'Grupo adicionado com sucesso.'
// })

// }, (err) => {
// 	$rootScope.$broadcast('evento',{
// 		alerta:'erro',
// 		mensagm: 'Falha ao adicionar o grupo.'
// 	})
// })
// }


	self.obterGrupos = function () {
		gpSvc.obterGrupos()
			.then((res) => {
				self.grupos = res.data.result;
			}, (err) => {
				$rootScope.$broadcast('evento',{
					alerta:'erro',
					mensagm: 'Falha ao obter o Grupo.'
				})
			})
	}

	self.removerGp = function (id) {
		gpSvc.removerGp(id)
			.then((res) => {
				if (res.data.success) {
					$rootScope.$broadcast('evento',{
						alerta:'success',
						mensagem: 'Grupo removido com sucesso.'
					})
					self.obterGrupos();					
				}
				console.log("resposta do remover:", res);
			}, (err) => {				
				$rootScope.$broadcast('evento',{
					alerta:'erro',
					mensagem: 'Falha ao remover Grupo.'
				})
			})
	}

	self.refreshMembers = function (query) {
		userSvc.getUsersQuery(query)
			.then((res) => {
				self.users = res.data.result;
			}, (err) => {
				$rootScope.$broadcast('evento',{
					alerta:'erro',
					mensagem: 'Falha ao obter os integrantes.'
				})
			})
	}

	self.mostrarForm = function () {
	    if (self.adicionando)
	      self.adicionando = false;
	    else
	      self.adicionando = true;
  	}

	if (!authSvc.isAuthed()) {
		$location.path('/login');
	}
}
