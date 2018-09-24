define('HomeView',[
  'backbone',
  'SingletonView',
  'LocationModel',
  'PanelView',
  'MapView',
  'TwitterView'
  ],
  function(
    Backbone, SingletonView, LocationModel, PanelView, MapView, TwitterView
  ){

    var HomeView = Backbone.View.extend({

      initialize: function(options) {
        this.html = `
          <div id="home-view">
            <div id="map-view"></div>
            <div class="panel" id="panel-twitter"></div>
          </div>
        `;
        this.$el.html(this.html);

        this.bounds = options.bounds !== undefined ?
          options.bounds :  {center:{lat: 42.9634, lng:-85.6681}, dist: 0.015};

        this.panelView = new TwitterView({el:'#panel-twitter', bounds: this.bounds});
        this.MapView = new MapView({el:'#map-view', bounds: this.bounds});
        return this;
      },


      render: function(){
        this.panelView.render();
        // this.MapView.render();
      }

    });

    return new SingletonView(HomeView);
});
