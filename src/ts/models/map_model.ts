/// <reference path="../../../types/index.d.ts" />

define('MapModel',[
  'backbone',
  'underscore',
  'EventMediator',
  'ClusterModel',
  'MarkerModel',
  ],
  function(
    Backbone, _, EventMediator, ClusterModel, MarkerModel,
  ){

  var PARSE_LAT_LNG = function(num: number):number {
    // @ts-ignore: error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
    return parseInt(10000 * num) / 10000;
  }

  var MapModel = Backbone.Model.extend({

      defaults: {
        'selected': undefined,
        'mapParams': {},
      },

      initialize: function (data: any): void{
        this.map = new google.maps.Map(data.mapELE,{
          zoom:16,
          center: new google.maps.LatLng(
            PARSE_LAT_LNG(data.bounds.center.lat),
            PARSE_LAT_LNG(data.bounds.center.lng)
          ),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
        });
        this.clusters = new ClusterModel(this.map, []);
      },

      updateLocationMarker: function(latlng: App.LatLng) :void{
        this.clearCurrentLocationMarker();

        const markerParams : App.MarkerParams = {
          position: latlng,
          label: "",
          map: this.map
        };

        this.currentLocationMarker = new google.maps.Marker(markerParams);
      },

      clear: function(): void{
        this.clearCurrentLocationMarker();
        this.clusters.clear();
      },

      clearCurrentLocationMarker: function(): void{
        if(this.currentLocationMarker !== undefined){
          this.currentLocationMarker.setMap(null);
        }
      },

      addLocations: function(locations: App.Locations):void{

        let markers: App.Marker[] = [];

        let subscriber: string;
        for(subscriber in locations){
          markers = locations[subscriber].map((model: App.ItemModel) => {
              return new MarkerModel(model);
          });
        }

        this.clusters.addMarkers(markers);
      },

      updateSelectedCluster: function(cluster: any){
        let lat: number = cluster.center_.lat();
        let lng: number = cluster.center_.lng();

        let markers: App.Marker[] = cluster.markers_;
        markers.forEach((marker: App.Marker) => {
          marker.model.show();
        });

        this.set('selected', markers[0].model)
        this.updateLocationMarker({lat:lat, lng:lng});
      },

      updateBounds: function(){
        let bounds: any = this.map.getBounds();
        let center: google.maps.LatLng = this.map.getCenter();
        let clusters:App.Cluster[] = this.clusters.getClusters();

        let lat:number = center.lat();
        let lng:number = center.lng();

        let latf:number = bounds.f.b;
        let lngb:number = bounds.b.b;

        let distLat:number = Math.abs(lat - latf);
        let distLng:number = Math.abs(lng - lngb);

        let distMax:number = Math.max(distLat, distLng)

        let params : App.Params = {
          bounds: {
            center: {
              lat: lat,
              lng: lng
            },
            dist: distMax
          },
          clusters: clusters,
        };


        let cluster: App.Cluster;
        for(cluster of clusters){

          let marker: App.Marker;
          for(marker of cluster.markers_){
            marker.model.changeVisible(true);
          }
        }

        this.set('mapParams', params);
      },
  });

  return MapModel;

});
