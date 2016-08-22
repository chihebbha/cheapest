/**
 * Alerts Controller
 */

angular
    .module('RDash')
    .controller('LoginCtrl', ['$scope','$http','$cookies','$location', LoginCtrl]);
function LoginCtrl($scope,$http,$cookies,$cookieStore,$location) {

    
    
    $scope.login=function(u){
        
        
         $http.post('http://localhost:8000/login',u).  success(function(data) {
            
     if(data != null){
         
      $cookies.put('nom', data.nom);
      $cookies.put('prenom', data.prenom);
               console.log($cookies.get('nom')+" / "+$cookies.get('prenom'));

     }
        });
     
     
        
    }
   
    
    $scope.logout=function(){
        $cookies.remove('nom');
        $cookies.remove('prenom');
    }
    
    
     $scope.register=function(u){
        
         $cookies.put('nom', u.name);
      $cookies.put('prenom', u.prenom);
       
          $http.post('http://localhost:8000/signup',u).  success(function(data) {
            
    console.log(data);
        });
    }
    
    
    
      if(($cookies.get('nom')!=undefined)&&($cookies.get('nom')!=null)) {
           $scope.log=true;
      $scope.user={'nom':$cookies.get('nom'),'prenom':$cookies.get('prenom')};  }
        else
          $scope.log=false;  
       
    
    
    
  
        
       
    
}