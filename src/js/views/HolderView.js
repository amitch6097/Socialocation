define('HolderView',[
  'backbone'
  ],
  function(
    Backbone
  ){
    var initHolderView = function(viewObj){

      var HolderView = Backbone.View.extend({

        initialize: function(data) {
          this.collection = data.collection;
          this.el = data.el;
          this.collection.on("change", this.render.bind(this));
          return this;
        },

        render: function() {
          this.$el.empty();
          this.collection.each((model) => {
            var view = new viewObj({
              el: this.el,
              model: model,
            });
            view.render();
          });
          return this;
        }

      });

      return HolderView;
    }

    return initHolderView;
});
