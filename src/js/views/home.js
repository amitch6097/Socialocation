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
        const bounds = options.bounds !== undefined ?
          options.bounds :  {center:{lat: 42.9634, lng:-85.6681}, dist: 0.015};

        this.panelLeftView = new PanelViewTwitter({el:'#panel-twitter', bounds: bounds});
        this.panelRightView = new PanelViewInstagram({el:'#panel-instagram', bounds: bounds});

        let geolocationView = new GeolocationView({el: '#geolocation-view'});
        let mapView = new MapView({el:'#map-view', bounds: bounds});
        mapView.render();
      },


      render: function(){
        return this;
      }

    });

    return new SingletonView(HomeView);
});
