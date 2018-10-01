define('PanelView',[
  'backbone',
  'PanelHeadingView',
  'EventMediator',
  'ScrollView',
  'tpl!views/templates/panel_view.tpl'
  ],
  function(
    Backbone, PanelHeadingView, EventMediator, ScrollView, PanelViewTemplate
  ){

    var PanelView = Backbone.View.extend({

      initialize: function(options) {
        const titleId = `panel-${options.uniqueName}-title`;
        const itemsId = `panel-${options.uniqueName}-items`;

        this.template = PanelViewTemplate;
        this.$el.html(this.template({
          titleId:titleId,
          itemsId:itemsId
        }));

        this.headingView = new PanelHeadingView({
          el: `#${titleId}`,
          heading: options.heading,
          uniqueName: options.uniqueName
        });

        const ScrollViewInit = new ScrollView(options.subView);
        this.scrollView = new ScrollViewInit({el: `#${itemsId}`, collection: this.collection});

        this.collection.on("change:newElements", this.scrollView.render.bind(this.scrollView));
        this.collection.on("change:scrollTo", this.scrollTo.bind(this));
        EventMediator.listen('map-clear-all', this.clear, this)
      },

      scrollTo: function(){
        const scrollToModel = this.collection.attributeGet('scrollTo');

        if(
          scrollToModel === undefined,
          this.uniqueName !== scrollToModel.get('modelType')
        ) return;

        $(`#panel-${this.uniqueName}-items`).animate({
          scrollTop: $(`#panel-${this.uniqueName}-items`).scrollTop() + $(`#${this.uniqueName}-${scrollToModel.id_str}`).position().top
        }, 1000);
      },

      render: function(){
        this.scrollView.render();
        return this;
      },

      clear: function(){
        this.scrollView.clear();
        this.collection.clear();
      },

      show: function(e){
        this.showPanel({hide:false});
      },

      start: function(e){
        this.showPanel({pause:false});
      },

      pause: function(e){
        const uniqueName = $(e.target).attr("data-url");
        this.hidePanel(
          `<button class="start-button" id="${uniqueName}-start" >Start</button>`,
          {pause:true}
        );
      },

      hide: function(e){
        const uniqueName = $(e.target).attr("data-url");
        this.hidePanel(
          `<button class="show-button" id="${uniqueName}-show" >Show</button>`,
          {hide:true}
        );
      },

      changeView: function(html, css, animation, callback, context, data){
        this.$el.animate(animation.begin, 200, ()=>{
          this.$el.html(html);
          this.$el.css(css)
          this.$el.animate(animation.end, 200, () => {
            if(callback !== undefined){
              callback.call(context, data);
            }
          });
        });
      },

    });

    return PanelView;
});
