define('BoxesView',[
  'backbone',
  'BoxView'
  ],
  function(
    Backbone, BoxView
  ){

    var BoxesView = Backbone.View.extend({

      initialize: function(data) {
        this.boxViews = [];
        this.element = '<button id="box-add">click me</button><div id="app-boxes"></div>'

        this.collection.forEach((model) => {
          var box = new BoxView({
            el: '#app-boxes',
            model: model,
          });
          this.boxViews.push(box);
        });

        return this;
      },

      // ONLY CALLED WHEN PAGE IS REOPENED

      render: function() {
        this.$el.append(this.element);
        this.boxViews.forEach((view)=>{
          view.render();
        });
        return this;
      },

      events: {
        'click #box-add': 'addBox',
        "click .box": "onClick"
      },

      onClick: function(e){
        console.log("click box class");
      },

      // events: {
      //     'click #box-add': 'addBox',
      //     'click .box': 'removeBox'
      // },
      //
      addBox: function(e){
        $('#app-boxs').append('<div class="box"></div>');
        this.elements = this.$el.html();
      },
      //
      // removeBox: function(e){
      //   $(e.target).remove();
      //   this.elements = this.$el.html();
      // }

    });

    // CREATE A SINGLETON

    var boxesViewInstance = undefined;

    var BoxesViewManager = function(params){
      if(boxesViewInstance === undefined){
        boxesViewInstance = new BoxesView(params);
      }
      return boxesViewInstance;
    }

    return BoxesViewManager;
});
