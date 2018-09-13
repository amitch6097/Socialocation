define([
  'backbone',
  'NavView',
  'NavModel'
  ],
  function(
    Backbone, NavView, NavModel
  ){

  var App = Backbone.View.extend({
    initialize: function() {
      let navModel = new NavModel();
      Backbone.history.start()
      navModel.navigate(location.hash, true)

      let navView = new NavView({el: "#nav-data", router:navModel});

    }
  });

  return App;
});
