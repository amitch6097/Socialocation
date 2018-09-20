define('ScrollView',[
  'backbone'
  ],
  function(
    Backbone
  ){
    var initScrollView = function(viewObj){

      var ScrollView = Backbone.View.extend({

        initialize: function(data) {
          this.collection = data.collection;
          this.el = data.el;
          return this;
        },

        render: function() {
          $(this.el).empty();
          this.collection.visibleElements.forEach((model) => {
            var view = new viewObj({
              el: this.el,
              model: model,
            });
            view.render();
          });
          return this;
        }
      });

      return ScrollView;
    }

    return initScrollView;
});
