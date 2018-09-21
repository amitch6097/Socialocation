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
        EventMediator.listen("twitter-locations-loaded", this.loadLocations, this);
        EventMediator.listen('twitter-tweet-hover', this.setCurrentLocationMarker, this);

        this.locations = {};
        this.selected = {};
        this.locationMarker = {};
      },

      loadLocations: function(locations){
        console.log(this)
        this.set('locations', Object.assign(this.locations, locations));
        this.trigger('change:locations');
      },

      setCurrentLocationMarker: function(latlng){
        this.set('locationMarker', latlng);
      },

      updateSelected: function(cluster){
        let lat = cluster.center_.lat();
        let lng = cluster.center_.lng();

        let markers = cluster.markers_;
        this.selected = markers.map((marker) => {
          return marker['label']
        });

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

        let miles = LAT_LNG_TO_MILES(distMax);

        let params = {
          query: {geocode: `${lat},${lng},${miles}mi`},
          bounds: {center: {lat: lat, lng: lng}, dist: distMax}
        };
        EventMediator.emit("map-bounds-changed", params);
      }

  });

  return MapModel;

});
