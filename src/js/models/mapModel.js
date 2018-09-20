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
        EventMediator.listen("locations-loaded", this.loadLocations, this);
        EventMediator.listen('tweet-clicked', this.setCurrentLocation, this);

        this.locations = {};
        this.selected = {};
      },

      loadLocations: function(locations){
        this.set('locations', Object.assign(this.locations, locations));
      },

      setCurrentLocation: function(latlng){
        console.log(latlng);
        this.set('currentLocation', latlng);
      },

      getLocations: function(){
        return this.locations;
      },

      updateSelected: function(cluster){
        let lat = cluster.center_.lat();
        let lng = cluster.center_.lng();

        let markers = cluster.markers_;
        this.selected = markers.map((marker) => {
          return marker['label']
        });

        EventMediator.emit('map-cluster-selected', this.selected);

        this.set('currentLocation', {lat:lat, lng:lng});
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

        let miles = LAT_LNG_TO_MILES(Math.max(distLat, distLng));

        let params = {geocode: `${lat},${lng},${miles}mi`}
        EventMediator.emit("bounds-changed", params);
      }

  });

  return MapModel;

});
