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

        this.clusterView = data.clusterView;

        this.$el.html(this.html);
        this.$el.css({width:$( window ).width(), height:$( window ).height()});

        this.model = new MapModel();

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
          {listen:"clusterclick", context:this, callback:this.populateClusterView},
          {listen:"clusterclick", context:console, callback:console.log}
        ]);



        // this.map.addListener('tilesloaded', this.mapBoundsUpdated.bind(this));
        this.markerCluster.addListener('clusteringend', this.mapBoundsUpdated.bind(this));
        this.map.addListener('click', this.clusterView.empty.bind(this.clusterView));
        this.model.on('change:locations', this.render.bind(this));
        this.model.on('change:locationMarker', this.updateLocationMarker.bind(this));
        EventMediator.listen('map-model-assign-locations', this.render, this);
        EventMediator.listen('tweet-location-pressed', this.setCenter, this);
        EventMediator.listen('twitter-clear', this.initialize, this);

        return this;
      },

      resetClusterView: function(e){
        console.log(e)
      },

      fromLatLngToPoint: function(latLng, map) {
      	var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
      	var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
      	var scale = Math.pow(2, map.getZoom());
      	var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
      	return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
      },

      populateClusterView: function(cluster){
        var point = this.fromLatLngToPoint(cluster.getCenter(), this.map);
        this.clusterView.update(point, cluster.getMarkers());
      },

      mapBoundsUpdated:function(){
        this.clusterView.empty();
        // console.log(this.markerCluster)
        params = {};
        params['bounds'] = this.map.getBounds();
        params['center'] = this.map.getCenter();
        params['markers'] = this.allMarkers;
        params['clusters'] = this.markerCluster.getClusters();
        console.log(this.markerCluster.clusters_)
        this.model.updateBounds(params);
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
