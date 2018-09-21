define('MapView',[
  'backbone',
  'MapModel',
  'gmaps',
  'gmapsTwo',
  'MarkerModel',
  'ClusterMarkerModel',
  'EventMediator'
  ],
  function(
    Backbone, MapModel, gmaps, gmapsTwo, MarkerModel, ClusterMarkerModel, EventMediator
  ){

    var MapView = Backbone.View.extend({

      initialize: function(data) {
        this.markers = [];
        this.markerCluster;
        this.currentLocationMarker;
        this.allMarkers = [];

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

        this.markerCluster = new ClusterMarkerModel(this.map, this.markers,[
          {listen:"clusterclick", context:this.model, callback:this.model.updateSelected},
          {listen:"mouseover", context:console, callback:console.log}
        ]);

        this.map.addListener('tilesloaded', (e) => {
          console.log(this.allMarkers)
          this.model.updateBounds({
            bounds: this.map.getBounds(),
            center: this.map.getCenter(),
            markers: this.allMarkers,
            markerCluster: this.markerCluster
          });
        });

        this.map.addListener('bounds_changed', (e) => {
          console.log(this.allMarkers)
          this.model.updateBounds({
            bounds: this.map.getBounds(),
            center: this.map.getCenter(),
            markers: this.allMarkers,
            markerCluster: this.markerCluster
          });
        });

        this.model.on('change:locations', this.render.bind(this));
        this.model.on('change:locationMarker', this.updateLocationMarker.bind(this));
        EventMediator.listen('map-model-assign-locations', this.render, this)

        return this;
      },

      render: function(model){
        let locations = model.locations
        this.createCluster(locations);
        // this.markerCluster.repaint();

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
        console.log("CREATE")
        console.log(locations);
        let markers = [];
        for(subscriber in locations){
          markers = locations[subscriber].map((model) => {
              return new MarkerModel(model);
          });
        }
        this.allMarkers = this.allMarkers.concat(markers);
        this.markerCluster.addMarkers(markers);
      },

    });

    return MapView;
});
