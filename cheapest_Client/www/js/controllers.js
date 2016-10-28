angular.module('starter.controllers', [])

  .factory('sessionService',['$http',function($http){
    return {
      set:function(key,value){
        return localStorage.setItem(key,JSON.stringify(value));
      },
      get:function(key){
        return JSON.parse(localStorage.getItem(key));
      },
      destroy:function(key){
        return localStorage.removeItem(key);
      },
    };
  }])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$http,$state,sessionService) {




  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.user={};





  $http.get('http://localhost:8000/getVendeurs').
  success(function(data) {

    $scope.vendeurs=data;


  });

  $http.get('http://localhost:8000/getProduit').
  success(function(data) {

    $scope.produits=data;


  });


  $http.get('http://localhost:8000/getCategories').
  success(function(data) {

    $scope.categories=data;


  });
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  $scope.logout = function() {
    sessionService.destroy('id');
    sessionService.destroy('nom');
    sessionService.destroy('prenom');
    sessionService.destroy('type');
    $scope.user=null;
    $state.transitionTo($state.current, null, {reload: true, notify:true});

  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };



  $scope.log=function(loginData){
    $http.post('http://localhost:8000/login',loginData).  success(function(data) {

      if(data != null){
        sessionService.set('id',data.id);
        sessionService.set('nom',data.nom);
        sessionService.set('prenom',data.prenom);
        sessionService.set('type',data.type);



        $scope.user.id=sessionService.get('id');
        $scope.user.nom=sessionService.get('nom');
        $scope.user.prenom=sessionService.get('prenom');
        $scope.user.type=sessionService.get('type');

        console.log($scope.user);


      }
    });
    $state.transitionTo($state.current, null, {reload: true, notify:true});
  };
  $scope.user.id=sessionService.get('id');
  $scope.user.nom=sessionService.get('nom');
  $scope.user.prenom=sessionService.get('prenom');
  $scope.user.type=sessionService.get('type');




  if((sessionService.get('nom')!=undefined)&&(sessionService.get('nom')!=null)) {
    $scope.logg=true;
    $scope.user={'id':sessionService.get('id'),'nom':sessionService.get('nom'),'prenom':sessionService.get('prenom'),type:sessionService.get('type')};


  }
  else
    $scope.logg=false;












  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };







  $scope.getParCat=function(id){

    $http.get('http://localhost:8000/getProduitParCat/'+id).
    success(function(data) {

      $scope.produitsParCat=data;


    });

    $scope.getNomVendeur=function($id){

for(var i=0 ;i<$scope.vendeurs.length;i++){

  if($scope.vendeurs[i].id==$id)
  {
    return $scope.vendeurs[i].nom+' '+$scope.vendeurs[i].prenom;
  }

}

    };

    $state.go("app.produits", { path: 'app.produits' });

  };



})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
