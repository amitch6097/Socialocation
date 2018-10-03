define('SingletonView',[
  'backbone'
  ],
  function(
    Backbone
  ){

    var SingletonView = function(obj: any){

      var instance: any = undefined;

      var createInstance = function(params: any){
        if(instance === undefined){
          instance = new obj(params);
        }
        return instance;
      }

      return createInstance;
    }

    return SingletonView;
});
