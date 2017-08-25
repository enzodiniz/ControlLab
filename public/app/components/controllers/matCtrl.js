angular.module("ControlLab")
	.controller("matCtrl", matCtrl)

function matCtrl(matSvc, authSvc, $location, $rootScope, localSvc, lojaSvc, recSvc) {
	
	var self = this;

	self.addMaterial = function () {
		console.log(self.local);
		matSvc.addMaterial(self.dt, self.desc, self.local[0]._id, self.rec[0]._id, self.loja[0]._id, 
			self.quant, self.val)
			.then((res) => {
				if (res.data.success) {
					self.obterMateriais();
					$rootScope.$broadcast('evento', {
						alerta: 'success',
						mensagem: 'Material adicionado com sucesso.'
					})
					self.dt = undefined; 
					self.desc = undefined;
					self.local[0]._id = undefined;
					self.rec[0]._id = undefined;
					self.loja[0]._id = undefined;
					self.quant = undefined;
					self.val = undefined;
					self.adicionando = false;
				}
			}, (err) => {
				$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Falha ao adicionar material.'
				})
			})
	}

	self.obterMateriais = function () {
		matSvc.obterMateriais()
			.then((res) => {
				self.materiais = res.data.result;
			}, (err) => {
				$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Falha ao obter os material.'
				})	
			})
	}

	self.removerMaterial = function (id) {
		matSvc.removerMaterial(id)
			.then((res) => {
				if (res.data.success) {
					self.obterMateriais();
					$rootScope.$broadcast('evento', {
						alerta: 'success',
						mensagem: 'Material removido com sucesso.'
					})
				}
			}, (err) => {
				$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Falha ao remover material.'
				})
			})
	}

	self.refreshPlaces = function (query) {
		console.log("chegou na função do ctrl");
		localSvc.getPlaces(query)
			.then((res) => {
				self.locais = res.data.result;
			}, (err) => {
				$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Falha ao obter locais.'
				})
			})
	}

	self.refreshStores = function (query) {
		lojaSvc.getStores(query)
			.then((res) => {
				self.lojas = res.data.result;
			}, (err) => {
				$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Falha ao obter as lojas.'
				})
			})
	}

	self.refreshResources = function (query) {
		recSvc.getResources(query)
			.then((res) => {
				self.recursos = res.data.result;
			}, (err) => {
				$rootScope.$broadcast('evento', {
						alerta: 'erro',
						mensagem: 'Falha ao obter os recursos.'
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