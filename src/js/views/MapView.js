define('MapView',[
  'backbone',
  'MapModel',
  'gmaps',
  'gmapsTwo',
  'MarkerModel',
  'ClusterMarkerModel',
  'EventMediator',
  ],
  function(
    Backbone, MapModel, gmaps, gmapsTwo, MarkerModel, ClusterMarkerModel, EventMediator
  ){

    var PARSE_LAT_LNG = function(num){return parseInt(10000 * num) / 10000;}

    var MapView = Backbone.View.extend({

      initialize: function(data) {
        this.markers = [];
        this.markerCluster;
        this.currentLocationMarker;
        this.allMarkers = [];
        this.bounds = data.bounds;

        this.html = `
        <div id="map"></div>
        `;

        this.$el.html(this.html);
        this.$el.css({width:$( window ).width(), height:$( window ).height()});

        this.model = new MapModel();

        console.log(
          this.bounds,
PARSE_LAT_LNG(this.bounds.center.lat),
PARSE_LAT_LNG(this.bounds.center.lng)
);

        this.map = new google.maps.Map(this.el,{
          zoom:16,
          center: new google.maps.LatLng(
            PARSE_LAT_LNG(this.bounds.center.lat),
            PARSE_LAT_LNG(this.bounds.center.lng)
          ),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        this.markerCluster = new ClusterMarkerModel(this.map, this.markers,[
          {listen:"clusterclick", context:this.model, callback:this.model.updateSelectedCluster},
          {listen:"mouseover", context:console, callback:console.log}
        ]);

        this.map.addListener('tilesloaded', this.mapBoundsUpdated.bind(this));
        this.map.addListener('bounds_changed', this.mapBoundsUpdated.bind(this));
        this.model.on('change:locations', this.render.bind(this));
        this.model.on('change:locationMarker', this.updateLocationMarker.bind(this));
        EventMediator.listen('map-model-assign-locations', this.render, this);
        EventMediator.listen('tweet-location-pressed', this.setCenter, this);
        EventMediator.listen('twitter-clear', this.initialize, this);

        return this;
      },

      mapBoundsUpdated:function(){
        params = {};
        params['bounds'] = this.map.getBounds();
        params['center'] = this.map.getCenter();
        params['markers'] = this.allMarkers;
        params['markerCluster'] = this.markerCluster;
        this.model.updateBounds(params)
      },

      setCenter: function(center){
        this.map.setCenter(center);
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
