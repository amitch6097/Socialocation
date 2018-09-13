define('HolderView',[
  'backbone'
  ],
  function(
    Backbone
  ){
    var initHolderView = function(viewObj){

      var HolderView = Backbone.View.extend({

        initialize: function(data) {
          console.log('new holder view')
          this.collection = data.collection;
          this.views = [];

          this.collection.forEach((model) => {
            var view = new viewObj({
              el: data.el,
              model: model,
            });
            this.views.push(view);
          });

          return this;
        },

        // ONLY CALLED WHEN PAGE IS REOPENED

        render: function() {
          this.views.forEach((view)=>{
            view.render();
          });
          return this;
        }
      });

      return HolderView;
    }

    return initHolderView;
});
