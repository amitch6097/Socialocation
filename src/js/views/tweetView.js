define('TweetView',[
  'backbone'
  ],
  function(
    Backbone
  ){

    var TweetView = Backbone.View.extend({



      // <twitterwidget class="twitter-tweet twitter-tweet-rendered" id="twitter-widget-0" style="position: static; visibility: visible; display: block; transform: rotate(0deg); max-width: 100%; width: 300px; min-width: 220px; margin-top: 10px; margin-bottom: 10px;" data-tweet-id="1042139532592852994"></twitterwidget>

      initialize: function(data) {
        this.model = data.model;
        this.el = data.el;


        this.template = _.template(`
          <div class="tweet-link" id="tweet-<%= cid %>" data-url="<%= cid %>">
          <blockquote class="twitter-tweet" width="300" data-lang="en">
            <a href="<%= link %>">
            </a>
          </blockquote>
          <script async src="https://platform.twitter.com/widgets.js"  charset="utf-8"></script>
          </div>
        `);

        let link = this.model.getLink();
        this.html = this.template({cid: this.model.cid,link: link});
        this.render();

        this.model.on("change:selected", this.render.bind(this));

        return this;
      },


      render: function(){
        // console.log(this.model.selected)
        $(`#tweet-${this.model.cid}`).remove();

        if(this.model.selected){
          $(this.el).prepend(this.html);
          // $('.holder-items').animate({
          //   scrollTop: $(this.el).scrollTop() + $(`#tweet-${this.model.cid}`).position().top
          // }, 1000);
          // `#tweet-${this.model.cid}`.scrollTop;
          // $('.holder-items:first').scrollTop();
          // this.el.scrollTop;
        } else {
          $(this.el).append(this.html);
        }
        return this;
      }

    });

    return TweetView;
});
