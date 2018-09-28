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

      initialize: function(data) {
        const titleId = `panel-${this.uniqueName}-title`;
        const itemsId = `panel-${this.uniqueName}-items`;

        this.template = PanelViewTemplate;
        this.$el.html(this.template({titleId:titleId, itemsId:itemsId}));

        this.headingView = new PanelHeadingView({
          el: `#${titleId}`,
          heading: this.heading,
          uniqueName: this.uniqueName
        });

        const ScrollViewInit = new ScrollView(this.subView);
        this.scrollView = new ScrollViewInit({el: `#${itemsId}`, collection: this.collection});

        this.collection.on("change:newElements", this.scrollView.render.bind(this.scrollView));
        this.collection.on("change:scrollTo", this.scrollTo.bind(this));

        return this;
      },

      scrollTo: function(){
        if(this.uniqueName !== this.collection.scrollTo.get('modelType')) return;
        console.log(this.collection.scrollTo)
        console.log(`#${this.uniqueName}-${this.collection.scrollTo.id_str}`)
        console.log($(`#${this.uniqueName}-${this.collection.scrollTo.id_str}`))

        $(`#panel-${this.uniqueName}-items`).animate({
          scrollTop: $(`#panel-${this.uniqueName}-items`).scrollTop() + $(`#${this.uniqueName}-${this.collection.scrollTo.id_str}`).position().top
        }, 1000);
      },

      render: function(){
        this.scrollView.render();
        return this;
      },

      clear: function(){
        this.scrollView.clear();
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
          `<button id="${uniqueName}-start" >Start</button>`,
          {pause:true}
        );
      },

      hide: function(e){
        const uniqueName = $(e.target).attr("data-url");
        this.hidePanel(
          `<button id="${uniqueName}-show" >Show</button>`,
          {hide:true}
        );
      },

      changeView: function(html, css, animation, callback, context, data){
        $(this.el).animate(animation.begin, 200, ()=>{
          $(this.el).html(html);
          $(this.el).css(css)
          $(this.el).animate(animation.end, 200, () => {
            if(callback !== undefined){
              callback.call(context, data);
            }
          });
        });
      },

    });

    return PanelView;
});
