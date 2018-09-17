define('Mediator',[
  'backbone',
  'SingletonView'
  ],
  function(
    Backbone
  ){

    var mediator = function(){
      let events = {};

      var subscribe = function(event, callback, obj){
        if(!events[event]) events[event] = [];
        events[event].push({callback: callback, obj:obj});
        return this;
      };

      var emit = function(event, data){
        if(!events[event]) return false;
        events[event].forEach((subscription) => {
          subscription.callback.apply(subscription.obj, data)
        });
        return this;
      };

      return {
        subscribe: subscribe,
        emit: emit
      };

    }();

    return mediator;
});
