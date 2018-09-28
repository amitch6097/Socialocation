define('MapModel',[
  'backbone',
  'EventMediator'
  ],
  function(
    Backbone, EventMediator
  ){

  var LAT_LNG_TO_MILES = function(miles){return miles*69;}

  var MapModel = Backbone.Model.extend({

      initialize: function (data) {

        this.locations = {};
        this.selected = {};
        this.locationMarker = {};

        EventMediator.listen("collection-locations-loaded", this.loadLocations, this);
        EventMediator.listen('item-hover-request', this.setCurrentLocationMarker, this);

      },

      clear: function(){
        this.locations = {};
        this.selected = {};
        this.locationMarker = {};
      },

      loadLocations: function(locations){
        this.locations = Object.assign(this.locations, locations);
        EventMediator.emit('map-model-assign-locations', this)
      },

      setCurrentLocationMarker: function(latlng){
        this.set('locationMarker', latlng);
      },

      updateSelectedCluster: function(cluster){
        let lat = cluster.center_.lat();
        let lng = cluster.center_.lng();

        let markers = cluster.markers_;
        markers.forEach((marker) => {
          marker.model.show();
        });

        this.selected = markers[0].model;

        EventMediator.emit('map-cluster-selected', this.selected);
        this.set('locationMarker', {lat:lat, lng:lng});
      },

      updateBounds: function(data){
        let bounds = data.bounds;
        let center = data.center;

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
          clusters: data.clusters,
        };

        for(let cluster of data.clusters){
          for(let marker of cluster.markers_){
            marker.model.changeVisible(true);
          }
        }

        EventMediator.emit("map-bounds-changed", params);
      }

  });

  return MapModel;

});
