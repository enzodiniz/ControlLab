angular.module('ControlLab')
	.controller('gpCtrl', gpCtrl)

function gpCtrl(authSvc) {
	
	if (!authSvc.isAuthed()) {}
}