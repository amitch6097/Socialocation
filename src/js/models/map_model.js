define('MapModel',[
  'backbone',
  'EventMediator',
  'ClusterModel',
  'MarkerModel',
  ],
  function(
    Backbone, EventMediator, ClusterModel, MarkerModel
  ){

  var LAT_LNG_TO_MILES = function(miles){return miles*69;}
  var PARSE_LAT_LNG = function(num){return parseInt(10000 * num) / 10000;}

  var MapModel = Backbone.Model.extend({

      defaults: {
        'selected': undefined,
        'mapParams': {},
      },

      initialize: function (data) {

        this.map = new google.maps.Map(data.mapELE,{
          zoom:16,
          center: new google.maps.LatLng(
            PARSE_LAT_LNG(data.bounds.center.lat),
            PARSE_LAT_LNG(data.bounds.center.lng)
          ),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        this.clusters = new ClusterModel(this.map, []);
      },

      updateLocationMarker: function(latlng){
        this.clearCurrentLocationMarker();

        const params = {
          position: latlng,
          label: "currenTweets",
          map: this.map
        };

        this.currentLocationMarker = new google.maps.Marker(params);
      },

      clear: function(){
        this.clearCurrentLocationMarker();
        this.clusters.clear();
      },

      clearCurrentLocationMarker: function(){
        if(this.currentLocationMarker !== undefined){
          this.currentLocationMarker.setMap(null);
        }
      },

      addLocations: function(locations){

        let markers = [];

        for(subscriber in locations){
          markers = locations[subscriber].map((model) => {
              return new MarkerModel(model);
          });
        }

        this.clusters.addMarkers(markers);
      },

      updateSelectedCluster: function(cluster){
        let lat = cluster.center_.lat();
        let lng = cluster.center_.lng();

        let markers = cluster.markers_;
        markers.forEach((marker) => {
          marker.model.show();
        });

        this.set('selected', markers[0].model)
        this.updateLocationMarker({lat:lat, lng:lng});
      },

      updateBounds: function(data){
        let bounds = this.map.getBounds();
        let center = this.map.getCenter();
        let clusters = this.clusters.getClusters();

        let lat = center.lat();
        let lng = center.lng();

        let latf = bounds.f.b;
        let lngb = bounds.b.b;

        let distLat = Math.abs(lat - latf);
        let distLng = Math.abs(lng - lngb);

        let distMax = Math.max(distLat, distLng)

        let params = {
          bounds: {
            center: {
              lat: lat,
              lng: lng
            },
            dist: distMax
          },
          clusters: clusters,
        };

        for(let cluster of clusters){
          for(let marker of cluster.markers_){
            marker.model.changeVisible(true);
          }
        }

        this.set('mapParams', params);
      },
  });

  return MapModel;

});
