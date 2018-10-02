/// <reference path="../../../types/index.d.ts" />

define('MarkerModel',[
  'gmaps',
  ],
  function(
    gmaps
  ){

    var MarkerModel = function(model: App.ItemModel){

      const latlng: App.LatLng = model.get('latlng');

      var marker = new google.maps.Marker({
        position: {lat: latlng.lat, lng: latlng.lng },
        label: model.id_str,
      });
      // @ts-ignore: error TS2339: Property 'model' does not exist on type 'Marker'
      marker.model = model;

      return marker;

    }

    return MarkerModel;
});
