define('HomeView',[
  'backbone',
  'SingletonView',
  'LocationModel',
  'PanelView',
  'MapView',
  ],
  function(
    Backbone, SingletonView, LocationModel, PanelView, MapView
  ){

    var HomeView = Backbone.View.extend({

      initialize: function() {
        this.html = `
          <p>Home</p>
          <div id="home-view">
            <div id="map-view"></div>
            <div class="holder" id="holder-left"></div>
          </div>
        `;
        this.$el.html(this.html);

        this.panelView = new PanelView({el:'#holder-left'});
        this.MapView = new MapView({el:'#map-view', subscribers:[this.panelView]});
        return this;
      },

      render: function(){
        this.panelView.render();
        this.MapView.render();
      }

    });

    return new SingletonView(HomeView);
});
