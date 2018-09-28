define('PanelViewTweet',[
  'backbone',
  'TweetView',
  'EventMediator',
  'tpl!views/templates/panel_view_tweet.tpl'
  ],
  function(
    Backbone, TweetView, EventMediator, PanelViewTweetTemplate
  ){

    var PanelViewTweet = Backbone.View.extend({

      initialize: function(data) {
        this.model = data.model;

        TweetView.prototype.initialize.apply(this, [data])

        this.el = data.el;
        this.visible = false;
        this.updating = false;
        this.elementId = `#tweet-${this.model.id_str}`;
        this.superTemplate = PanelViewTweetTemplate

        // <button class="button-go-to-tweet-location" id="location-<%= id_str %>" data-url=<%= latlng %> >Go To Location</button>

        this.html = this.superTemplate({
          id_str: this.model.id_str,
          tweetHtml: this.html,
          latlng: JSON.stringify(this.model.latlng)
        });

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

    return PanelViewTweet;
});
