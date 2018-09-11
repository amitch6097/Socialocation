define(['backbone',
  'NavView',
  'NavModel'
  ],
  function(
    Backbone, NavView, NavModel
  ){

  var App = Backbone.View.extend({
    initialize: function() {
      Backbone.history.start()
      let navModel = new NavModel();
      let navView = new NavView({el: "#nav-data", router:navModel});
    }
  });

  return App;
});
