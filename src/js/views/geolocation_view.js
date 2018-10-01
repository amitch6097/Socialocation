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
        "click #map-button-search":"userLocationInput"
      },

      initialize: function(data) {
        this.model = new GeolocationModel({});
        this.html = GeolocationViewTemplate();
        $(this.el).html(this.html);
        this.model.on("change:latlng", this.modelLocationLoaded.bind(this))
      },

      userLocationInput: function(e){
        let input = $('#map-input-search').val();
        this.model.parseUserInput(input)
        EventMediator.emit('map-clear-all');
      },

      modelLocationLoaded: function(model, value){
        EventMediator.emit('map-center-request', value);
      },
    });

    return GeolocationView;
});
