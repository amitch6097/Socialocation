define('EventMediator',[
  'backbone',
  ],
  function(
    Backbone
  ){

    var EventMediator = function(){
      let events = {};

      var listen = function(event, callback, obj){
        if(!events[event]) events[event] = [];
        events[event].push({callback: callback, obj:obj});
        return this;
      };

      var emit = function(event, data){
        if(!events[event]) return false;
        events[event].forEach((subscription) => {
          subscription.callback.apply(subscription.obj, [data])
        });
        return this;
      };

      return {
        listen: listen,
        emit: emit
      };

    }();

    return EventMediator;
});
