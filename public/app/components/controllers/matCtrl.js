angular.module("ControlLab")
	.controller("matCtrl", matCtrl)

function matCtrl(matSvc, authSvc, $location) {
	
	var self = this;

	self.obterMateriais = function () {
		matSvc.obterMateriais()
			.then((res) => {
				self.materiais = res.data.result;
			}, (err) => {
				
			})
	}

	if (!authSvc.isAuthed()) {
		$location.path('/login');
	}
}