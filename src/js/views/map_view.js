define('MapView',[
  'backbone',
  'MapModel',
  'gmaps',
  'PopupView',
  'EventMediator',
  'tpl!views/templates/map_view.tpl',
  ],
  function(
    Backbone, MapModel, gmaps, PopupView, EventMediator, MapViewTemplate
  ){

    var PARSE_LAT_LNG = function(num){return parseInt(10000 * num) / 10000;}

    var MapView = Backbone.View.extend({

      events: {
        "click #map-button-search":"userLocationInput"
      },

      initialize: function(data) {
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

        this.model.on("change:mapParams", (model, params) => {
          EventMediator.emit("map-bounds-changed", params);
        });

        this.model.map.addListener('bounds_changed',
          this.clusterView.empty.bind(this.clusterView)
        );

        this.model.map.addListener('click',
          this.clusterView.empty.bind(this.clusterView)
        );

        google.maps.event.addListener(this.model.clusters, 'clusterclick', (clusterItem) => {
          this.clusterView.populate.apply(this.clusterView, [clusterItem]);
          this.model.updateSelectedCluster.apply(this.model, [clusterItem]);

          const markers = clusterItem.getMarkers();
          const marker = markers[0];
          const model = marker.model;

          EventMediator.emit("map-cluster-selected", model);
        });

        google.maps.event.addListener(this.model.clusters, 'clusteringend', (clusterItem) => {
          this.model.updateBounds.apply(this.model)
        });

        EventMediator.listen('twitter-clear',
          this.clear,
          this
        );

        EventMediator.listen('map-center-request',
          this.model.map.setCenter,
          this.model.map
        );

        EventMediator.listen("collection-locations-loaded",
          this.model.addLocations,
          this.model
        );

        EventMediator.listen('item-hover-request',
          this.model.updateLocationMarker,
          this.model
        );

        EventMediator.listen('map-clear-all',
          this.clear,
          this
       );

      },

      clear: function(){
        this.model.clear();
      },

    });

    return MapView;
});
