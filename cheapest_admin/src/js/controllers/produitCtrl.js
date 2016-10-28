/**
 * Alerts Controller
 */

angular
    .module('RDash')
    .controller('ProduitCtrl', ['$scope','$http','$cookies', ProduitCtrl]);
Pri
function ProduitCtrl($scope,$http,$cookies,$cookieStore) {

    
  
    
    
    
    //login section
    
    
     if(($cookies.get('nom')!=undefined)&&($cookies.get('nom')!=null)) {
           $scope.log=true;
      $scope.user={'id':$cookies.get('id'),'nom':$cookies.get('nom'),'prenom':$cookies.get('prenom'),type:$cookies.get('type')};  }
        else
          $scope.log=false;  
     // end login section
    
     var dd=new Date();
    var month=dd.getMonth()+1;
    if(month<10){
        month="0"+month;
    }
   
    console.log(dd.getFullYear()+"-"+month+"-"+dd.getDate() );
    
            $http.get('http://localhost:8000/getProduit').
        success(function(data) {
      
      $scope.produits=data;
      

        });
    
    
    
        $http.get('http://localhost:8000/getCategories').
        success(function(data) {
    
      $scope.categories=data;
      

        });
    
    
    
    
    $scope.addProduit=function(c){
    
    var    dd=c.begin;
          var month=dd.getMonth()+1;
    if(month<10){
        month="0"+month;
    }
        
        
        
         var    bb=c.end;
          var bbmonth=bb.getMonth()+1;
    if(bbmonth<10){
        bbmonth="0"+bbmonth;
    }
        
        var cc={
                           libelle:c.libelle,
                           prix:c.prix,
                           begin:dd.getFullYear()+"-"+month+"-"+dd.getDate() ,
                           end:bb.getFullYear()+"-"+bbmonth+"-"+bb.getDate() ,
                           stock:c.stock,
                           etat:1,
                           category_id:c.category_id,
                           vendeur_id:$cookies.get('id')
                       };
        

        
        
      /*      $http({
    method: 'POST',
    url: 'http://localhost:8000/addProduit',
    data:  cc
})   ;  */
                
 $http.post('http://localhost:8000/addProduit',cc).  success(function(data) {
    
      $scope.produits=data;
      

        });
    };
    
    
    
    $scope.removeProduit=function(id){
       
     $http.get('http://localhost:8000/deleteProduit/'+id).
        success(function(data) {
      
      $scope.produits=data;
      

        });
        
};
    
    
    $scope.confirmProduit=function(id){
        $http.get('http://localhost:8000/confirmProduit/'+id). success(function(data) {
      
      $scope.produits=data;
      

        });
        
    };

    $scope.refuseProduit=function(id){
        $http.get('http://localhost:8000/refuseProduit/'+id).  success(function(data) {
      
      $scope.produits=data;
      

        });
        
    };
    
    
    
     $scope.getNomVendeur=function(id){
        $http.get('http://localhost:8000/getNomVendeur/'+id).  success(function(data) {
      
     $scope.NomVendeur =data;
      

        });
         //return $scope.NomVendeur;
        
    };
       
    
}