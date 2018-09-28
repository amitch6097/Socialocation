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
      },

      modelLocationLoaded: function(){
        latlng = this.model.latlng;
        EventMediator.emit('map-center-request', latlng);
      },
    });

    return GeolocationView;
});
