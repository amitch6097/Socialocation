define('PanelView',[
  'backbone',
  'PanelHeadingView',
  'EventMediator',
  'ScrollView',
  ],
  function(
    Backbone, PanelHeadingView, EventMediator, ScrollView
  ){

    var PanelView = Backbone.View.extend({

      initialize: function(data) {
        let titleId = `panel-${this.uniqueName}-title`;
        let itemsId = `panel-${this.uniqueName}-items`;

        this.template = _.template(`
          <div class="panel-title" id="<%= titleId %>">
          </div>
          <div class="panel-items" id="<%= itemsId %>">
          </div>
        `);
        this.$el.html(this.template({titleId:titleId, itemsId:itemsId}));

        this.headingView = new PanelHeadingView({el: `#${titleId}`});

        let ScrollViewInit = new ScrollView(this.subView);
        this.scrollView = new ScrollViewInit({el: `#${itemsId}`, collection: this.collection});

        return this;
      },

      render: function(){
        this.headingView.render()
        this.scrollView.render();
        return this;
      },

      clear: function(){
        this.scrollView.clear();
      },

    });

    return PanelView;
});
