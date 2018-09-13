define('NewView',[
  'backbone',
  'BoxesView',
  'BoxesCollection',
  'SingletonView'
  ],
  function(
    Backbone,
    BoxesView,
    BoxesCollection,
    SingletonView
  ){

    var NewView = Backbone.View.extend({

      initialize: function() {
        this.element = '<p>NEW PAGE TITLE</p>'
        var boxesCollection = new BoxesCollection();
        this.boxesView = new BoxesView({collection: boxesCollection, el: this.$el});
        return this;
      },

      render: function(){
        this.$el.html(this.element);
        this.boxesView.render();
      }

    });

    // CREATE A SINGLETON
    return new SingletonView(NewView);
});
