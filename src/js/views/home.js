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

      initialize: function() {
        this.html = `
          <div id="home-view">
            <div id="map-view"></div>
            <div class="panel" id="panel-twitter"></div>
          </div>
        `;
        this.$el.html(this.html);

        this.panelView = new TwitterView({el:'#panel-twitter'});
        this.MapView = new MapView({el:'#map-view'});
        return this;
      },

      render: function(){
        this.panelView.render();
        // this.MapView.render();
      }

    });

    return new SingletonView(HomeView);
});
