/// <reference path="../../../types/index.d.ts" />

define('GeolocationView',[
  'backbone',
  'tpl!views/templates/geolocation_view.tpl',
  'GeolocationModel',
  'EventMediator',
  ],
  function(
    Backbone, GeolocationViewTemplate, GeolocationModel, EventMediator
  ){

    var GeolocationView = Backbone.View.extend({

      events: {
        "click #map-button-search":"userLocationInput",
        "click #screen-switch-button": "screenSwitch"
      },

      initialize: function(data: any): void {
        this.model = new GeolocationModel({});
        this.html = GeolocationViewTemplate();
        $(this.el).html(this.html);
        this.model.on("change:latlng", this.modelLocationLoaded.bind(this))
      },

      screenSwitch: function(e: Event): void {
        let request = $(e.target).attr('data-url');

        if(request === 'full-screen-request'){
          $(e.target).html("Revert");
          $(e.target).attr('data-url', 'minimize-screen-request');
        } else {
          $(e.target).html("Full Screen");
          $(e.target).attr('data-url', 'full-screen-request');
        }

        EventMediator.emit(request, request);
      },

      userLocationInput: function(e: Event): void{
        let input: string | undefined = $('#map-search-text').val() as string;
        this.model.parseUserInput(input)
        EventMediator.emit('map-clear-all');
      },

      modelLocationLoaded: function(model, value:App.LatLng) : void{
        EventMediator.emit('map-center-request', value);
      },
    });

    return GeolocationView;
});
