define(['backbone',
  'NavModel',
  'HomeView',
  'NewView'
  ],
  function(
    Backbone, NavView, HomeView, NewView
  ){

  var NavModel = Backbone.Router.extend({

      routes: {
          "home": "viewHome",
          "new": "viewNew"
      },

      viewHome: function(){
        let homeView = new HomeView({el: "#app-main"});
        homeView.render();
      },

      viewNew: function(){
        let newView = new NewView({el: "#app-main"});
        newView.render();
      }

  });

  return NavModel;

});
