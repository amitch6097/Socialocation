define('PanelViewGram',[
  'backbone',
  'InstagramView',
  'tpl!views/templates/panel_view_gram.tpl'

  ],
  function(
    Backbone, InstagramView, PanelViewGramTemplate
  ){

    var PanelViewGram = Backbone.View.extend({

      initialize: function(data) {
        this.model = data.model;
        InstagramView.prototype.initialize.apply(this, [data])

        this.el = data.el;
        this.visible = false;

        this.superTemplate = PanelViewGramTemplate
        this.html = this.superTemplate({
          id_str: this.model.id_str,
          instagramHtml: this.html,
          latlng: JSON.stringify(this.model.latlng)
        });

        this.elementId = `#instagram-${this.model.id_str}`;

        this.model.on("change:selected", this.selected.bind(this));
        this.model.on("change:update", this.updateView.bind(this));

        this.updateView();

        return this;
      },

      selected: function(){
        $(this.elementId).removeClass("tweet-container-selected");
        if(this.model.selected){
          $(this.elementId).addClass("tweet-container-selected");
        }
      },

      updateView: function(){
        if(this.visible === true && this.model.visible === true){
          this.model.visible = false;
          return;
        }
        if(this.model.visible === true){
          this.visible = true;

          $(this.el).append(this.html);
        } else {
          $(this.elementId).remove();
          this.visible = false
        }
        this.model.visible = false;
      },

    });

    return PanelViewGram;
});
