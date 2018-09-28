define('MapView',[
  'backbone',
  'MapModel',
  'gmaps',
  'gmapsTwo',
  'MarkerModel',
  'ClusterMarkerModel',
  'ClusterView',
  'EventMediator',
  'tpl!views/templates/map_view.tpl',
  ],
  function(
    Backbone, MapModel, gmaps, gmapsTwo, MarkerModel, ClusterMarkerModel, ClusterView, EventMediator, MapViewTemplate
  ){

    var PARSE_LAT_LNG = function(num){return parseInt(10000 * num) / 10000;}

    var MapView = Backbone.View.extend({

      events: {
        "click #map-button-search":"userLocationInput"
      },

      initialize: function(data) {
        this.markers = [];
        this.markerCluster;
        this.currentLocationMarker;
        this.allMarkers = [];
        this.bounds = data.bounds;
        this.mapElement = '#map-map';
        this.html = MapViewTemplate();

        this.model = new MapModel();
        this.clusterView = new ClusterView({el: '#panel-cluster'});

        this.$el.html(this.html);
        $(this.mapElement).css({width:$( window ).width(), height:$( window ).height()});

        // ANDREW MAP CAN'T BE IN IN THE MODEL
        this.map = new google.maps.Map(document.getElementById('map'),{
          zoom:16,
          center: new google.maps.LatLng(
            PARSE_LAT_LNG(this.bounds.center.lat),
            PARSE_LAT_LNG(this.bounds.center.lng)
          ),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        this.markerCluster = new ClusterMarkerModel(this.map, this.markers,[
          {listen:"clusterclick", context:this.model, callback:this.model.updateSelectedCluster},
          {listen:"clusterclick", context:this.clusterView, callback:this.clusterView.populate},
          {listen:"clusteringend", context:this, callback:this.mapBoundsUpdated},
          {listen:"clusterclick", context:console, callback:console.log},
        ]);


        this.map.addListener('bounds_changed', this.clusterView.empty.bind(this.clusterView));
        // this.markerCluster.addListener('clusteringend', this.mapBoundsUpdated.bind(this));
        this.map.addListener('click', this.clusterView.empty.bind(this.clusterView));

        this.model.on('change:locations', this.render.bind(this));
        this.model.on('change:locationMarker', this.updateLocationMarker.bind(this));

        EventMediator.listen('map-model-assign-locations', this.render, this);
        EventMediator.listen('map-center-request', this.setCenter, this);
        EventMediator.listen('twitter-clear', this.clear, this);

        return this;
      },

      clear: function(){
        this.model.clear();

        if(this.currentLocationMarker !== undefined ){
          this.currentLocationMarker.setMap(null);
          this.currentLocationMarker = undefined;
        }

        // VERY AGRESSIVE
        this.markerCluster.removeMarkers(this.markers);
        this.markerCluster.clearMarkers();
        this.markerCluster.clusters_ = [];
        this.markerCluster.repaint();
        this.markers = [];

        this.clusterView.empty();
      },

      mapBoundsUpdated:function(){
        params = {};
        params['bounds'] = this.map.getBounds();
        params['center'] = this.map.getCenter();
        params['clusters'] = this.markerCluster.getClusters();

        this.model.updateBounds(params);
      },

      setCenter: function(center){
        this.map.setCenter(center);
      },

      render: function(model){
        let locations = model.locations
        this.createCluster(locations);
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
