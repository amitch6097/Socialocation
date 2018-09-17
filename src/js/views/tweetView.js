define('TweetView',[
  'backbone'
  ],
  function(
    Backbone
  ){

    var TweetView = Backbone.View.extend({

      initialize: function(data) {
        this.model = data.model;
        this.el = data.el

        this.template = _.template(`
          <blockquote class="twitter-tweet" width="300" data-cards="hidden" data-lang="en">
            <a href="<%= link %>">
            </a>
          </blockquote>
          <script async src="https://platform.twitter.com/widgets.js"  charset="utf-8"></script>
        `);

        this.model.on("response", this.render)
        return this;
      },

      render: function(){
        let link = this.model.getLink();
        $(this.el).append(this.template({link: link}));
        return this;
      }

    });

    return TweetView;
});
