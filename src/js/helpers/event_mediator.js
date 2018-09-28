define('EventMediator',[
  'backbone',
  ],
  function(
    Backbone
  ){

    var EventMediator = function(){

      var events = {
        'twitter-clear':[],
        'collection-locations-loaded':[],
        'map-center-request':[],
        'item-hover-request':[],
        'map-model-assign-locations':[],
        'map-bounds-changed':[],
      };

      var listen = function(event, callback, obj){
        if(!events[event]) events[event] = [];
        if(events[event] === undefined){
          throw "Event Not Recognized: " + event;
        }
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
