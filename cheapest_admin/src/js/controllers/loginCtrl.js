/**
 * Alerts Controller
 */

angular
    .module('RDash')
    .controller('LoginCtrl', ['$scope','$http','$cookies','$location','$route' LoginCtrl]);
function LoginCtrl($scope,$http,$cookies,$cookieStore,$location,$route) {

    
 
    $scope.login=function(u){
        
        
         $http.post('http://localhost:8000/login',u).  success(function(data) {
            
     if(data != null){
    
      $cookies.put('id', data.id);

      $cookies.put('nom', data.nom);
      $cookies.put('prenom', data.prenom);
         $cookies.put('type', data.type);
               

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
         $cookies.put('id', u.id);
         
       
          $http.post('http://localhost:8000/signup',u).  success(function(data) {
            
    console.log(data);
        });
     
    }
    
    
    
      if(($cookies.get('nom')!=undefined)&&($cookies.get('nom')!=null)) {
           $scope.log=true;
      $scope.user={'id':$cookies.get('id'),'nom':$cookies.get('nom'),'prenom':$cookies.get('prenom'),type:$cookies.get('type')}; 
          
         
      }
        else
          $scope.log=false;  
       
    
    
    
  
        
       
    
}