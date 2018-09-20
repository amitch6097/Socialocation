define([
  'backbone',
  'HomeView'
  ],
  function(
    Backbone, HomeView
  ){

  var App = Backbone.View.extend({
    initialize: function() {
      var homeView = new HomeView({el: "#app-main"});
      homeView.render();

    }
  });

  return App;
});
