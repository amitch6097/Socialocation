define('MapView',[
  'backbone',
  'MapModel',
  'gmaps',
  'gmapsTwo'
  ],
  function(
    Backbone, MapModel, gmaps, gmapsTwo
  ){

    var MapView = Backbone.View.extend({

      initialize: function(data) {
        this.html = `
        <div id="map"></div>
        `;
        this.$el.html(this.html);

        this.model = new MapModel({subscribers: data.subscribers});
        this.model.on('change', this.render.bind(this));
        this.model.on('change:currentLocation', this.updateLocation.bind(this));

        this.markers = [];
        this.markerCluster;
        this.currentLocationMarker;

        this.$el.css({width:$( window ).width(), height:$( window ).height()});

        this.map = new google.maps.Map(this.el,{
          zoom:16,
          center: new google.maps.LatLng(42.9634, -85.6681),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        this.map.addListener('bounds_changed', (e) => {
          this.model.updateBounds({bounds: this.map.getBounds(), center: this.map.getCenter()});
        });

        return this;
      },

      render: function(){
        console.log("map render")
        let locations = this.model.getLocations();

        for(subscriber in locations){
          this.markers = Object.keys(locations[subscriber]).map( (cid) => {
              return this.createMarker(locations[subscriber][cid], cid);
          });
        }

        this.createCluster();
      },

      updateLocation: function(){
        if(this.currentLocationMarker !== undefined){
          this.currentLocationMarker.setMap(null);
        }

        this.currentLocationMarker = new google.maps.Marker({
          position: this.model.get('currentLocation'),
          label: "currenTweet",
          map: this.map
        });
      },

      createCluster: function(){
        this.markerCluster = new MarkerClusterer(this.map, this.markers, {
          zoomOnClick: false,
          imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
          minimumClusterSize: 1
        });

        google.maps.event.addListener(this.markerCluster, 'clusterclick', (cluster) => {
            this.model.updateSelected(cluster)
        });
        google.maps.event.addListener(this.markerCluster, 'mouseover', (cluster) => {
            console.log("mouseover");
            console.log(cluster)
        });
      },

      createMarker: function(position, cid){
        var marker = new google.maps.Marker({
          position: position,
          label: cid
        });

        marker.addListener('click', (e) => {
          this.model.updateSelected(cid)
        });

        return marker;
      },

    });

    return MapView;
});
