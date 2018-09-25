define('PanelTweetView',[
  'backbone',
  'TweetView'
  ],
  function(
    Backbone, TweetView
  ){

    var PanelTweetView = Backbone.View.extend({

      initialize: function(data) {
        this.model = data.model;
        TweetView.prototype.initialize.apply(this, [data])

        this.el = data.el;
        this.visible = false;


        this.superTemplate = _.template(`
          <div class="tweet-container" id="tweet-<%= cid %>" data-url="<%= cid %>">
            <button class="button-go-to-tweet-location" id="location-<%= cid %>" data-url=<%= latlng %> >Go To Location</button>
            <%= tweetHtml %>
          </div>
        `);

        this.html = this.superTemplate({
          cid: this.model.cid,
          tweetHtml: this.html,
          latlng: JSON.stringify(this.model.latlng)
        });

        this.elementId = `#tweet-${this.model.cid}`;

        this.model.on("change:selected", this.selected.bind(this));
        // this.model.on("change:visible", this.changeVisible.bind(this));
        this.model.on("change:updateView", this.updateView.bind(this));


        this.render();

        return this;
      },

      selected: function(){
        $(this.elementId).removeClass("tweet-container-selected");
        if(this.model.selected){
          $(this.elementId).addClass("tweet-container-selected");
        }
      },

      updateView: function(){
        console.log(this.visible, this.model.visible)

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

      // changeVisible:function(model, value, options){
      //   if(this.visible && value) return;
      //
      //   $(this.elementId).remove();
      //
      //   if(value){
      //     this.visible = true;
      //     $(this.el).append(this.html);
      //   } else {
      //     this.visible = false
      //   }
      //
      // },

    });

    return PanelTweetView;
});
