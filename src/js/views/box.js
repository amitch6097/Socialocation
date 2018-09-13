define('BoxView',[
  'backbone'
  ],
  function(
    Backbone
  ){

    var BoxView = Backbone.View.extend({

      initialize: function(data) {
        this.element = '<div class="box" id="' + this.model.getModelId().toString() + '"></div>';
        this.el = data.el
        return this;
      },

      render: function(){
        $(this.el).append(this.element);
        return this;
      },

      events: {
        "click": "onClick"
      },

      onClick: function(e){
        console.log("CLICK BOX")
        $(e.target).remove();
      }

    });

    return BoxView;
});
