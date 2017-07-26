angular
  .module("ControlLab")
  .controller("homeCtrl", function($location, authSvc) {

    console.log("asdf");
    if (!authSvc.isAuthed()) {
      $location.path('/login');
    }
  })
