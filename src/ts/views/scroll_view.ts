define('ScrollView',[
  'backbone'
  ],
  function(
    Backbone
  ){
    var initScrollView = function(viewObj){

      var ScrollView = Backbone.View.extend({

        initialize: function(data: any): void {
          this.collection = data.collection;
          this.el = data.el;
        },

        clear: function(): void{
          $(this.el).empty();
        },

        render: function(): void {
          this.collection.each((model: App.ItemModel) => {
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
