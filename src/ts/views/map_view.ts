/// <reference path="../../../types/index.d.ts" />


define('MapView',[
  'backbone',
  'MapModel',
  'gmaps',
  'PopupView',
  'EventMediator',
  'tpl!views/templates/map_view.tpl',
  'ScrollPopupView'
  ],
  function(
    Backbone, MapModel, gmaps, PopupView, EventMediator, MapViewTemplate, ScrollPopupView
  ){

    var MapView = Backbone.View.extend({

      events: {
        "click #map-button-search":"userLocationInput"
      },

      initialize: function(data: any): void {
        this.$el.html(MapViewTemplate());
        // NECESSARY FOR GOOGLE MAPS API
        $('#map-map').css({
          width:$( window ).width(),
          height:$( window ).height()
        });
        this.model = new MapModel({
          bounds: data.bounds,
          mapELE: document.getElementById('map')
        });
        this.clusterView = new PopupView({el: '#panel-cluster'});
        this.model.on("change:mapParams", (model:any, params:any) => {
          EventMediator.emit("map-bounds-changed", params);
        });
        this.model.map.addListener('bounds_changed',this.clusterView.empty.bind(this.clusterView));
        this.model.map.addListener('click',this.clusterView.empty.bind(this.clusterView));
        google.maps.event.addListener(this.model.clusters, 'clusterclick', (clusterItem:any) => {
          this.clusterView.populate.apply(this.clusterView, [clusterItem]);
          this.model.updateSelectedCluster.apply(this.model, [clusterItem]);
          const markers: App.Marker[] = clusterItem.getMarkers();
          const marker: App.Marker = markers[0];
          const model: App.ItemModel = marker.model;
          EventMediator.emit("map-cluster-selected", model);
        });

        google.maps.event.addListener(this.model.clusters, 'clusteringend', (clusterItem: any) => {
          this.model.updateBounds.apply(this.model)
        });
        EventMediator.listen('twitter-clear',this.clear,this);
        EventMediator.listen('map-center-request',this.model.map.setCenter,this.model.map);
        EventMediator.listen("collection-locations-loaded",this.model.addLocations,this.model);
        EventMediator.listen('item-hover-request',this.model.updateLocationMarker,this.model);
        EventMediator.listen('map-clear-all',this.clear,this);
        EventMediator.listen('full-screen-request',this.setPopupView,this);
        EventMediator.listen('minimize-screen-request',this.setPopupView,this);
      },

      setPopupView: function(event):void {
        if (event === 'full-screen-request') {
          this.clusterView = new ScrollPopupView({el: '#scroll-holder-map-items'});
          return;
        }
        if (event === 'minimize-screen-request') {
          this.clusterView = new PopupView({el: '#panel-cluster'});
          return;
        }
      },

      clear: function(): void{
        this.model.clear();
      },
    });

    return MapView;
});
