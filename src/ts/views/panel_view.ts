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

      initialize: function(options: any): void {
        const titleId: string = `panel-${options.uniqueName}-title`;
        const itemsId: string = `panel-${options.uniqueName}-items`;
        this.unique = options.uniqueName;
        this.inView = true;

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

        EventMediator.listen('full-screen-request', this.hide, this);
        EventMediator.listen('minimize-screen-request', this.show, this);

        EventMediator.listen('map-clear-all', this.clear, this);
        EventMediator.listen('map-bounds-changed', this.collection.mapBoundsChange, this.collection);
        EventMediator.listen('map-cluster-selected', this.collection.mapClusterSelected, this.collection);
      },

      scrollTo: function() : void{
        const scrollToModel: App.ItemModel = this.collection.attributeGet('scrollTo');

        if(scrollToModel === undefined ||
          this.uniqueName !== scrollToModel.get('modelType')
        ) return;

        $(`#panel-${this.uniqueName}-items`).animate({
          scrollTop: $(`#panel-${this.uniqueName}-items`).scrollTop() + $(`#${this.uniqueName}-${scrollToModel.id_str}`).position().top
        }, 1000);
      },

      render: function(): void{
        this.scrollView.render();
        return this;
      },

      clear: function(): void{
        EventMediator.emit('panel-change');
        this.scrollView.clear();
        this.collection.clear();
      },

      show: function(e: Event): void{
        this.inView = true;
        this.$el.attr('data-url', 'show');

        this.showPanel({hide:false});
      },

      start: function(e: Event){
        this.inView = true;
        this.$el.attr('data-url', 'start');

        this.showPanel({pause:false});
      },

      pause: function(e: Event){
        if(!this.inView) return;
        this.$el.attr('data-url', 'pause');

        this.inView = false;
        const uniqueName:string = this.unique;
        this.hidePanel(
          `<button class="start-button" id="${uniqueName}-start" >Start</button>`,
          {pause:true}
        );
      },

      hide: function(e: Event){
        if(!this.inView) return;
        this.$el.attr('data-url', 'hide');

        this.inView = false;
        const uniqueName:string = this.unique;
        this.hidePanel(
          `<button class="show-button" id="${uniqueName}-show" >Show</button>`,
          {hide:true}
        );
      },

      changeView: function(html: string, css: object, animation: App.PanelAnimation, callback: any, context: any, data: any){
        EventMediator.emit('panel-change');
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
