define('TweetView',[
  'backbone'
  ],
  function(
    Backbone
  ){

    var TweetView = Backbone.View.extend({

      initialize: function(data) {
        this.model = data.model;
        this.el = data.el;
        this.visible = true;

        this.template = _.template(`
          <div class="tweet-container" id="tweet-<%= cid %>" data-url="<%= cid %>">
          <p><%= cid %></p>
            <blockquote class="twitter-tweet" width="300" data-lang="en">
              <a href="<%= link %>">
              </a>
            </blockquote>
            <script async src="https://platform.twitter.com/widgets.js"  charset="utf-8"></script>
          </div>
        `);

        let link = this.model.getLink();
        this.html = this.template({cid: this.model.cid,link: link});
        this.model.on("change:selected", this.selected.bind(this));
        this.model.on("change:visible", this.v.bind(this));


        this.render();

        return this;
      },

      selected: function(){
        $(`#tweet-${this.model.cid}`).removeClass("tweet-container-selected");
        if(this.model.selected){
          $(`#tweet-${this.model.cid}`).addClass("tweet-container-selected");
        }
      },

      v:function(model, value, options){
        console.log(value)

        $(`#tweet-${this.model.cid}`).remove();
        if(value){
          $(this.el).prepend(this.html);
        }
      },

      render: function() {
        $(this.el).append(this.html);
        return this;
      }

    });

    return TweetView;
});
