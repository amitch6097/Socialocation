define('MapModel',[
  'backbone'
  ],
  function(
    Backbone
  ){

  var MapModel = Backbone.Model.extend({

      initialize: function (data) {
        this.subscribers = data.subscribers;
        this.subscribers.forEach((subscribee) => {
          if(typeof subscribee['updateLocation'] !== 'function'){
            throw "Map Model can not handle this subscribee";
          }
        })
      },

      update: function(data){
        let cords = data.cords;
        this.subscribers.forEach((subscribee) => {
          subscribee.updateLocation(cords)
        });
      }

  });

  return MapModel;

});
