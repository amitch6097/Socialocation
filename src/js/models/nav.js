define('NavModel',[
  'backbone',
  'HomeView',
  'NewView'
  ],
  function(
    Backbone, HomeView, NewView
  ){

  var NavModel = Backbone.Router.extend({

      initialize: function () {
        console.log("NEW ROUTER")
        Backbone.history.start()

        return this;
      },

      routes: {
          "home": "viewHome",
          "new": "viewNew"
      },

      viewHome: function(){
        var homeView = new HomeView({el: "#app-main"});
        homeView.render();
      },

      viewNew: function(){
        var newView = new NewView({el: "#app-main"});
        newView.render();
      }

  });

  return NavModel;

});
