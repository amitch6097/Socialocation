define('HomeView',[
  'backbone',
  'SingletonView',
  'MapView',
  'PanelViewTwitter',
  'PanelViewInstagram',
  'ClusterView',
  'GeolocationView'
  ],
  function(
    Backbone, SingletonView, MapView, PanelViewTwitter, PanelViewInstagram, ClusterView, GeolocationView
  ){

    var HomeView = Backbone.View.extend({

      initialize: function(options) {
        this.html = `
          <div id="home-view">
            <div id="map-view"></div>
            <div id="geolocation-view"></div>
            <div class="panel" id="panel-twitter"></div>
            <div class="panel" id="panel-instagram"></div>

            <div class="panel-moving" id="panel-cluster"></div>
          </div>
        `;
        this.$el.html(this.html);

        this.bounds = options.bounds !== undefined ?
          options.bounds :  {center:{lat: 42.9634, lng:-85.6681}, dist: 0.015};

        this.panelLeftView = new PanelViewTwitter({el:'#panel-twitter', bounds: this.bounds});
        this.panelRightView = new PanelViewInstagram({el:'#panel-instagram', bounds: this.bounds});

        let clusterView = new ClusterView({el: '#panel-cluster'});
        let geolocationView = new GeolocationView({el: '#geolocation-view'});
        let mapView = new MapView({el:'#map-view', bounds: this.bounds, clusterView: clusterView});
        return this;
      },


      render: function(){
        this.panelLeftView.render();
        // this.MapView.render();
      }

    });

    return new SingletonView(HomeView);
});
