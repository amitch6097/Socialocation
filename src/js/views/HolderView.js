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
          this.cids = {};
          return this;
        },


        render: function() {
          // this.$el.empty();
          this.collection.each((model) => {
            let cid = model.cid;
            if(this.cids[cid] === undefined){
              this.cids[cid] = true;
              var view = new viewObj({
                el: this.el,
                model: model,
              });
              view.render();
            }
          });
          return this;
        }

      });

      return HolderView;
    }

    return initHolderView;
});
