define('MapView',[
  'backbone',
  'gmaps',
  'Mediator',
  'MapModel'
  ],
  function(
    Backbone, SingletonView, Mediator, MapModel
  ){

    var MapView = Backbone.View.extend({

      initialize: function(data) {
        this.html = `
        <div id="map"></div>
        `;
        this.$el.html(this.html);
        this.model = new MapModel({subscribers: data.subscribers});
        return this;
      },

      render: function(){
        this.$el.css({width:$( window ).width(), height:$( window ).height()});
        this.map = new google.maps.Map(this.el,{
          zoom:16,
          center: new google.maps.LatLng(43.81451767218152, -91.25057458877563),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        this.map.addListener('click', (e) => {
          Mediator.emit("map-click", this.map.getBounds());
        });

        return this;
      }

    });

    return MapView;
});
