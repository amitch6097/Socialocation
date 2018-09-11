define(['backbone',
  'HomeView'
  ],
  function(
    Backbone
  ){

    var HomeView = Backbone.View.extend({

      initialize: function() {
        console.log("HOME")
        this.$el.html('<p>Home</p>');
        return this;
      },

    });

    return HomeView;
});
