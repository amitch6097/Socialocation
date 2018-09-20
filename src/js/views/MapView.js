define('MapView',[
  'backbone',
  'MapModel',
  'gmaps',
  'gmapsTwo',
  'MarkerModel',
  'ClusterMarkerModel'
  ],
  function(
    Backbone, MapModel, gmaps, gmapsTwo, MarkerModel, ClusterMarkerModel
  ){

    var MapView = Backbone.View.extend({

      initialize: function(data) {
        this.markers = [];
        this.markerCluster;
        this.currentLocationMarker;

        this.html = `
        <div id="map"></div>
        `;
        this.$el.html(this.html);
        this.$el.css({width:$( window ).width(), height:$( window ).height()});

        this.model = new MapModel();

        this.map = new google.maps.Map(this.el,{
          zoom:16,
          center: new google.maps.LatLng(42.9634, -85.6681),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        this.map.addListener('bounds_changed', (e) => {
          this.model.updateBounds({bounds: this.map.getBounds(), center: this.map.getCenter()});
        });

        this.model.on('change:locations', this.render.bind(this));
        this.model.on('change:locationMarker', this.updateLocationMarker.bind(this));

        return this;
      },

      render: function(){

        let locations = this.model.get('locations');
        this.createCluster(locations);
        this.markerCluster.repaint();

      },

      updateLocationMarker: function(){
        if(this.currentLocationMarker !== undefined){
          this.currentLocationMarker.setMap(null);
        }

        this.currentLocationMarker = new google.maps.Marker({
          position: this.model.get('locationMarker'),
          label: "currenTweets",
          map: this.map
        });
      },

      createCluster: function(locations){

        for(subscriber in locations){
          this.markers = Object.keys(locations[subscriber]).map( (cid) => {
              return new MarkerModel(locations[subscriber][cid], cid);
          });
        }

        this.markerCluster = new ClusterMarkerModel(this.map, this.markers,[
          {listen:"clusterclick", context:this.model, callback:this.model.updateSelected},
          {listen:"mouseover", context:console, callback:console.log}
        ]);
      },

    });

    return MapView;
});
