define('PanelViewGram',[
  'backbone',
  'InstagramView',
  'tpl!views/templates/panel_view_gram.tpl'

  ],
  function(
    Backbone, InstagramView, PanelViewGramTemplate
  ){

    var PanelViewGram = Backbone.View.extend({

      initialize: function(data: any):void {
        this.model = data.model;
        InstagramView.prototype.initialize.apply(this, [data])

        this.el = data.el;
        this.visible = false;
        this.superTemplate = PanelViewGramTemplate

        this.html = this.superTemplate({
          id_str: this.model.id_str,
          instagramHtml: this.html,
          latlng: JSON.stringify(this.model.get('latlng'))
        });

        this.elementId = `#instagram-${this.model.id_str}`;
        this.model.on("change:selected", this.selected.bind(this));
        this.model.on("change:update", this.updateView.bind(this));

        this.updateView();
      },

      selected: function():void{
        $(this.elementId).removeClass("tweet-container-selected");
        if(this.model.get('selected')){
          $(this.elementId).addClass("tweet-container-selected");
        }
      },

      updateView: function():void{
        // GET THE VALUE AND IMMEDIATLEY TURN OFF
        const modelVisible: boolean = this.model.get('visible');
        this.model.set('visible', false);

        // the view is CURRENTLY VISIBLE and should REMAIN VISIBLE
        if(this.visible === true && modelVisible === true){
          this.model.set('visible', false);
          // this.model.visible = false;
          return;
        }

        // The view is CURRENTLY NOT VISIBLE and should be VISIBLE
        if(modelVisible === true){
          this.visible = true;
          $(this.el).append(this.html);

        // The view is CURRENTLY NOT VISIBLE and should be SET NOT VISIBLE
        } else {
          $(this.elementId).remove();
          this.visible = false
        }
      },

    });

    return PanelViewGram;
});
