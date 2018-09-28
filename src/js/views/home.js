define('HomeView',[
  'backbone',
  'tpl!views/templates/home_view.tpl',
  'SingletonView',
  'MapView',
  'PanelViewTwitter',
  'PanelViewInstagram',
  'GeolocationView'
  ],
  function(
    Backbone, HomeViewTemplate, SingletonView, MapView, PanelViewTwitter, PanelViewInstagram, GeolocationView
  ){

    var HomeView = Backbone.View.extend({

      initialize: function(options) {
        this.html = HomeViewTemplate();
        this.$el.html(this.html);

        // BOUNDS OR GRAND RAPIDS
        this.bounds = options.bounds !== undefined ?
          options.bounds :  {center:{lat: 42.9634, lng:-85.6681}, dist: 0.015};

        this.panelLeftView = new PanelViewTwitter({el:'#panel-twitter', bounds: this.bounds});
        this.panelRightView = new PanelViewInstagram({el:'#panel-instagram', bounds: this.bounds});

        let geolocationView = new GeolocationView({el: '#geolocation-view'});
        let mapView = new MapView({el:'#map-view', bounds: this.bounds});
        mapView.render();
        return this;
      },


      render: function(){
        return this;
      }

    });

    return new SingletonView(HomeView);
});
