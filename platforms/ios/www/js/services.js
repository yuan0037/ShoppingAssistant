angular.module('starter.services', [])

.factory('AuthFactory', function(localStorageService, authKey) {
  return {
    isLogged : function()
    {
      
      if(localStorageService.get(authKey) == null){
        return false;
      }
      return true;
    },
    login : function(user,password){
      localStorageService.set(authKey, {'user': user, 'password' : password});
    },
    logout : function(){
      localStorageService.remove(authKey);
    } 
  };
})


.factory('LogStorage', function(localStorageService, authKey) {
  return {
    
    setLog : function(type, detail_info){
      localStorageService.set('storage', {'type': type, 'detail_info' : detail_info});
    }
  };
});
