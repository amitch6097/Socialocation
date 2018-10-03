/// <reference path="../../../types/index.d.ts" />

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

      populate: function(cluster: App.MarkerClusterer): void{
        this.set(this.defaults, {silent: true});

        const point: google.maps.Point = this.fromLatLngToPoint(cluster.getCenter(), cluster.getMap());
        const markers: App.Marker[] = cluster.getMarkers();
        const next: boolean = markers.length > 1;

        this.set({
          'markers': markers,
          'marker': markers[0],
          'point': point,
          'next': next
        });

      },

      next: function():void{
        const markers: App.Marker[] = this.get('markers');
        let index:number = this.get('index');
        let next:boolean = true;
        let previous:boolean = true;

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

      previous: function():void{
        const markers: App.Marker[] = this.get('markers');
        let index:number = this.get('index');
        let next:boolean = true;
        let previous:boolean = true;

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

      fromLatLngToPoint: function(latLng: google.maps.LatLng, map: google.maps.Map): google.maps.Point {
        let topRight:google.maps.Point = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
        let bottomLeft:google.maps.Point = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
        let scale:number = Math.pow(2, map.getZoom());
        let worldPoint:google.maps.Point = map.getProjection().fromLatLngToPoint(latLng);
        return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
      },

  });

  return PopupModel;

});
