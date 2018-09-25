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

        clear: function(){
          $(this.el).empty();
        },

        render: function() {
          // $(this.el).empty();
          this.collection.each((model) => {
            var view = new viewObj({
              el: this.el,
              model: model,
            });
          });
          return this;
        }
      });

      return ScrollView;
    }

    return initScrollView;
});
