angular.module('ControlLab')
	.controller('gpCtrl', gpCtrl)

function gpCtrl(authSvc, $location,  $rootScope) {
 var self = this;

 self.addGp = function () {
 gpSvc.addGp(self.integrantes, self.nome )
.then((res) => {

self.obterGp();
self.adicionado = false;
self.integrantes = "";
self.nome = "";

$rootScope.$broadcast('evento',{
	alerta:'success',
	mensagm: 'Grupo adicionado com sucesso.'
})

}, (err) => {
	$rootScope.$broadcast('evento',{
		alerta:'erro',
		mensagm: 'Falha ao adicionar o grupo.'
	})
})
}


self.obterGp = function () {
	gpSvc.obterGp()
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
			self.obterGp();
			$rootScope.$broadcast('evento',{
				alerta:'success',
				mensagm: 'Grupo removido com sucesso.'
			})

		}, (err) => {
			self.obterGp();
			
			$rootScope.$broadcast('evento',{
				alerta:'erro',
				mensagm: 'Falha ao remover Grupo.'
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
