define(['backbone',
  'NewView'
  ],
  function(
    Backbone
  ){

    var NewView = Backbone.View.extend({

      initialize: function() {
        console.log("New")
        this.$el.html('<p>New</p>');
        return this;
      },

    });

    return NewView;
});
