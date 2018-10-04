define('ScrollPopupView',[
  'backbone',
  'tpl!views/templates/scroll_popup_view.tpl',
  'ScrollPopupModel',
  'TweetView',
  'InstagramView',
  'EventMediator'
  ],
  function(
    Backbone, ScrollPopupViewTemplate, ScrollPopupModel, TweetView, InstagramView, EventMediator
  ){

    const SELF_FLEX = [
      'flex-start',
      'flex-end',
      'center',
      'baseline',
      'stretch'
    ];

    var VIEW_TYPES  = {
      "twitter" : TweetView,
      "instagram" : InstagramView
    };

    var ScrollPopupView = Backbone.View.extend({

      events: {
        'click': 'empty'
      },

      initialize: function(data:any):void {
        this.model = new ScrollPopupModel({});
        this.model.on('change:markers', this.render, this);
        EventMediator.listen('panel-change', this.empty, this);
        EventMediator.listen('minimize-screen-request', this.empty, this);
      },

      render: function(): void{

        const leftPanelData: string = $('#panel-twitter').attr('data-url') as string;
        const rigthPanelData: string = $('#panel-instagram').attr('data-url') as string;

        const leftPanelOpen: number = leftPanelData === 'pause' || leftPanelData === 'hide' ? 0 : 330;
        const rightPanelOpen: number = rigthPanelData === 'pause' || rigthPanelData === 'hide' ? 0 : 330;

        const left:number = leftPanelOpen;
        const width:number = $( window ).width() - (leftPanelOpen + rightPanelOpen);

        this.$el.empty();
        this.$el.css({
          left:left,
          width:width,
          height:$( window ).height() - 80,
          "z-index":3,
        });

        const markers: App.MarkerModel[] = this.model.get('markers');
        let markersClone: App.MarkerModel[] = markers.slice(0);
        let i:number = 0;

        while(markersClone.length > 0){
          let marker:App.MarkerModel = markersClone.splice(markersClone.length * Math.random() | 0, 1)[0];

          let modelType: string = marker.model.get('modelType');
          let viewObject: any = VIEW_TYPES[modelType];
          let width: number = (Math.random() * 200) + 200;
          let id: string = `${i}-popup-container`;

          let item = new viewObject({
            el: this.$el,
            model: marker.model,
            width: width,
            id: id,
          });

          item.render();

          let index: number = Math.round(4 * Math.random())
          let flex: string = SELF_FLEX[index]
          $(`#${id}`).css("align-self", flex);

          i++;
        }
      },

      empty: function(): void{
        this.$el.css({
          width:0,
          height:0,
          "z-index":0,
        });
        this.$el.empty();
      },

      populate: function(cluster: any): void{
        this.model.populate(cluster)
      },

    });

    return ScrollPopupView;
});
