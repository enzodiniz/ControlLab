angular.module('ControlLab')
	.controller('gpCtrl', gpCtrl)

function gpCtrl(authSvc, $location) {
	
	if (!authSvc.isAuthed()) {
		$location.path('/login');
	}
}