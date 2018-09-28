define('PopupModel',[
  'backbone',
  'gmaps'
  ],
  function(
    Backbone, gmaps
  ){

  var PopupModel = Backbone.Model.extend({

      defaults:{
        'markers': [],
        'index': 0,
        'point': undefined,
        'marker': undefined,
        'previous': false,
        'next': false,
      },

      initialize: function (data) {
      },

      populate: function(cluster){
        const point = this.fromLatLngToPoint(cluster.getCenter(), cluster.getMap());
        const markers = cluster.getMarkers();
        const next = markers.length > 1;

        this.set({
          'markers': markers,
          'marker': markers[0],
          'index': 0,
          'point': point,
          'next': next
        });

      },

      next: function(){
        const markers = this.get('markers');
        let index = this.get('index');
        let next = true;
        let previous = true;

        index++;

        if(index >= markers.length - 1){
          next = false
        }

        this.set({
          'marker': markers[index],
          'index': index,
          'next': next,
          'previous': previous
        });
      },

      previous: function(){
        const markers = this.get('markers');
        let index = this.get('index');
        let next = true;
        let previous = true;

        index--;

        if(index <= 0){
          previous = false
        }

        this.set({
          'marker': markers[index],
          'index': index,
          'next': next,
          'previous': previous
        });
      },

      fromLatLngToPoint: function(latLng, map) {
        var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
        var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
        var scale = Math.pow(2, map.getZoom());
        var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
        return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
      },

  });

  return PopupModel;

});
