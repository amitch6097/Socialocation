define('HomeView',[
  'backbone',
  'SingletonView',
  'LocationModel',
  'PanelView',
  'MapView',
  'TwitterView',
  'ClusterView'
  ],
  function(
    Backbone, SingletonView, LocationModel, PanelView, MapView, TwitterView, ClusterView
  ){

    var HomeView = Backbone.View.extend({

      initialize: function(options) {
        this.html = `
          <div id="home-view">
            <div id="map-view"></div>
            <div class="panel" id="panel-twitter"></div>
            <div class="panel-moving" id="panel-cluster"></div>
          </div>
        `;
        this.$el.html(this.html);

        this.bounds = options.bounds !== undefined ?
          options.bounds :  {center:{lat: 42.9634, lng:-85.6681}, dist: 0.015};

        let clusterView = new ClusterView({el: '#panel-cluster'});
        this.panelView = new TwitterView({el:'#panel-twitter', bounds: this.bounds});
        this.MapView = new MapView({el:'#map-view', bounds: this.bounds, clusterView: clusterView});
        return this;
      },


      render: function(){
        this.panelView.render();
        // this.MapView.render();
      }

    });

    return new SingletonView(HomeView);
});
