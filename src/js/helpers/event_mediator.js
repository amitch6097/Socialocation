define('EventMediator',[
  'backbone',
  ],
  function(
    Backbone
  ){

    var EventMediator = function(){

      let events = {
        'twitter-clear':[],
        'twitter-locations-loaded':[],
        'map-center-request':[],
        'twitter-tweet-hover':[],
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

      var emit = async function(event, data){
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
