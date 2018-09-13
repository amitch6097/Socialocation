define('SingletonView',[
  'backbone'
  ],
  function(
    Backbone
  ){

    var SingletonView = function(obj){

      var instance = undefined;

      var createInstance = function(params){
        if(instance === undefined){
          instance = new obj(params);
        }
        return instance;
      }

      return createInstance;
    }

    return SingletonView;
});
