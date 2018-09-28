define('PanelViewInstagram',[
  'backbone',
  'PanelView',
  'PanelViewGram',
  'InstagramCollection',
  'SingletonView',
  'EventMediator',
  'tpl!views/templates/panel_view_instagram.tpl'
  ],
  function(
    Backbone, PanelView, PanelViewGram, InstagramCollection, SingletonView, EventMediator, PanelViewInstagramTemplate
  ){

    var PanelViewInstagram = PanelView.extend({

      events: {
        "mouseenter .instagram-container": "mouseHover",
        "click #instagram-hide": 'hide',
        "click #instagram-show": 'show',
        "click #instagram-pause": 'pause',
        "click #instagram-start": 'start'
      },

      initialize: function(options) {
        this.subView = PanelViewGram;
        this.uniqueName = "instagram";
        this.heading = PanelViewInstagramTemplate();

        this.collection = new InstagramCollection(null, {bounds: options.bounds});
        PanelView.prototype.initialize.apply(this, [options]);
      },

      mouseHover: function(e){
        e.preventDefault();
        let id_str = $(e.currentTarget).attr("data-url");
        this.collection.selectHover(id_str);
      },

      showPanel: function(settings){
        this.collection.setSettings(settings);
        let html = this.holdHtml
        let css = {height: "90%"};
        this.changeView(
          html,
          css,
          {begin: {right: "-=500"}, end: {right: "+=500"}}
        );
      },

      hidePanel: function(newHtml, settings){
        this.holdHtml = $(this.el).html();
        this.collection.setSettings(settings)

        let css = {height: "auto"};
        this.changeView(
          newHtml,
          css,
          {begin: {right: "-=500"}, end: {right: "+=500"}}
        );
      },

    });

    return new SingletonView(PanelViewInstagram);
});
