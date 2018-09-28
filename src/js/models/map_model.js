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
        'locations': {},
        'selected': {},
        'locationMarker':{},
        'bounds' : {},
        'markers': [],
        'allMarkers': [],
        'params': {},
        'markerCluster': undefined,
        'currentLocationMarker': undefined,
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

        this.markerCluster = new ClusterModel(this.map, this.get('markers'),[
          {listen:"clusterclick", context:console, callback:console.log},
        ]);
      },

      setCenter: function(center){
        this.map.setCenter(center);
      },

      updateLocationMarker: function(latlng){
        let currentLocationMarker = this.currentLocationMarker;
        if(currentLocationMarker !== undefined){
          currentLocationMarker.setMap(null);
        }

        this.currentLocationMarker = new google.maps.Marker({
          position: latlng,
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
        // this.allMarkers = this.allMarkers.concat(markers);
        this.markerCluster.addMarkers(markers);
      },

      clear: function(){
        this.set({
          'locations': {},
          'selected': {},
          'locationMarker':{}
        });
      },

      addLocations: function(locations){

        this.set('locations',
          Object.assign(this.get('locations'), locations)
        );

        let markers = [];
        for(subscriber in locations){
          markers = locations[subscriber].map((model) => {
              return new MarkerModel(model);
          });
        }
        // this.allMarkers = this.allMarkers.concat(markers);
        this.markerCluster.addMarkers(markers);
      },

      updateSelectedCluster: function(cluster){
        let lat = cluster.center_.lat();
        let lng = cluster.center_.lng();

        let markers = cluster.markers_;
        markers.forEach((marker) => {
          marker.model.show();
        });

        this.set('selected', markers[0].model)

        // EventMediator.emit('map-cluster-selected', this.selected);
        this.updateLocationMarker({lat:lat, lng:lng});
      },

      updateBounds: function(data){
        let bounds = this.map.getBounds();
        let center = this.map.getCenter();
        let clusters = this.markerCluster.getClusters();

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
          console.log(cluster.markers_.length);
          for(let marker of cluster.markers_){
            marker.model.changeVisible(true);
          }
        }

        this.set('params', params);
      },
  });

  return MapModel;

});
