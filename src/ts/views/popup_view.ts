define('PopupView',[
  'backbone',
  'tpl!views/templates/popup_view.tpl',
  'PopupModel',
  'TweetView',
  'InstagramView',
  ],
  function(
    Backbone, PopupViewTemplate, PopupModel, TweetView, InstagramView
  ){

    var VIEW_TYPES  = {
      "twitter" : TweetView,
      "instagram" : InstagramView
    }

    var PopupView = Backbone.View.extend({

      events: {
        "click #holder-title-previous":"previous",
        "click #holder-title-next":"next"
      },

      initialize: function(data:any):void {
        this.subElement = '#holder-map-items';

        this.model = new PopupModel({});
        this.model.on('change:marker', this.render, this);
      },

      render: function(): void{
        this.$el.html(PopupViewTemplate());

        $(this.subElement).empty();

        const point: google.maps.Point = this.model.get('point');
        const previous: boolean = this.model.get('previous');
        const next: boolean = this.model.get('next');

        const hidden: boolean = !previous && !next;
        if(hidden === true){
          $("#holder-map-title").empty();
        }

        $("#holder-title-previous").prop("disabled",!previous);
        $("#holder-title-next").prop("disabled",!next);


        this.$el.css({left:point.x, top:point.y});

        this.addItem();

        this.$el.css({visibility: "visible"});
        this.$el.css({ 'max-height': 'calc(100% - ' + point.y+ 'px)' });
        $(this.subElement).css({ 'max-height': 'calc(100% - ' + point.y+ 'px)' });
      },

      addItem: function(model: Backbone.Model){
        const itemModel: Backbone.Model = this.model.get('marker').model;

        let modelType: string = itemModel.get('modelType');
        let viewObject: any = VIEW_TYPES[modelType];

        let item = new viewObject({
          el: this.subElement,
          model: itemModel,
        });

      item.render();
    },

      empty: function(): void{
        this.$el.css({visibility: "hidden"});
        $(this.subElement).empty();
      },

      populate: function(cluster: any): void{
        this.model.populate(cluster)
      },

      next: function(): void{
        this.model.next();
      },

      previous: function(): void{
        this.model.previous();
      },

    });

    return PopupView;
});
