/// <reference path="../../../types/index.d.ts" />

define('Router',[
  'backbone',
  'HomeView',
  'EventMediator',
  ],
  function(
    Backbone, HomeView, EventMediator
  ){

  var Router = Backbone.Router.extend({

    routes: {
      "location/:lat/:lng/:dist":"location",
    },

    initialize: function(options: any):void {
      this.homeView;
      this.homeViewHasRendered = false;
      EventMediator.listen('map-bounds-changed', this.updateURL, this);
    },

    start: function(): void{
      if(!this.homeViewHasRendered){
        this.homeView = new HomeView({el: "#app-main", bounds: undefined});
      }
    },

    updateURL: function(data: App.Params):void{
      let bounds: App.Bounds = data.bounds;
      let center: App.LatLng = bounds.center;

      let URLoptions:string = `location/${center.lat}/${center.lng}/${bounds.dist}`;
      this.navigate(URLoptions, {trigger: false})
    },

    location: function(lat:string, lng:string, dist:string):void {
      this.homeViewHasRendered = true;
      let bounds : App.Bounds = {
        center: {
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        },
        dist: parseFloat(dist),
      };
      this.homeView = new HomeView({el: "#app-main", bounds: bounds});
    },

  });

  return Router;

});
