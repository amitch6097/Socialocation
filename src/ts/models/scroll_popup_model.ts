/// <reference path="../../../types/index.d.ts" />

define('ScrollPopupModel',[
  'backbone',
  'gmaps'
  ],
  function(
    Backbone, gmaps
  ){

  var ScrollPopupModel = Backbone.Model.extend({

      defaults:{
        'markers': [],
      },

      populate: function(cluster: App.MarkerClusterer): void{
        this.set(this.defaults, {silent: true});
        const markers: App.Marker[] = cluster.getMarkers();
        this.set({
          'markers': markers,
        });
      },

  });

  return ScrollPopupModel;

});
