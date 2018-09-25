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
        this.width = data.width === undefined ? 300 : data.width;

        this.template = _.template(`
          <blockquote class="twitter-tweet" width="<%= width %>" height="<%= width %>" data-lang="en">
            <a href="<%= link %>">
            </a>
          </blockquote>
          <script async src="https://platform.twitter.com/widgets.js"  charset="utf-8"></script>
        `);

        let link = this.model.getLink();

        this.html = this.template({
          link: link,
          width: this.width,
        });

        return this;
      },

      render: function() {
        console.log(this.html)
        $(this.el).append(this.html);
        return this;
      }

    });

    return TweetView;
});
