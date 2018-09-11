define(['backbone',
  'NewView'
  ],
  function(
    Backbone
  ){

    var NewView = Backbone.View.extend({

      initialize: function() {
        console.log("New")
        this.$el.html('<p>New</p><button id="box-add">click me</button><div id="app-boxs"><div class="box"></div><div class="box"></div><div class="box"></div><div class="box"></div></div>');
        return this;
      },

      events: {
          'click #box-add': 'addBox',
      },

      addBox: function(e){
        console.log("BOX ADD")
        $('#app-boxs').append('<div class="box"></div>');
      }

    });

    return NewView;
});
