define('PanelView',[
  'backbone',
  'TweetCollection',
  'TweetsView',
  'PanelHeadingView',
  'EventMediator'
  ],
  function(
    Backbone, TweetCollection, TweetsView, PanelHeadingView, EventMediator
  ){

    var PanelView = Backbone.View.extend({

      events: {
        "click .button-twitter-result-type": "twitterPopularFetch",
        "map-click":"mapClicked",
        "mouseenter .tweet-link": "tweetClicked"
      },

      mapClicked: function(e){
        console.log("PANEL VIEW: MAP CLICK");
      },

      updateBounds: function(bounds){
        this.collection.fetchData(bounds);
        return;
      },

      twitterPopularFetch: function(e){
        let resultType = $(e.target).attr("data-url");
        this.collection.fetchData({result_type: resultType})
      },

      tweetClicked: function(e){
        e.preventDefault();
        let cid = $(e.currentTarget).attr("data-url");
        this.collection.selectActiveTweet(cid);

        // $('.holder-items').animate({
        //   scrollTop: $parent.scrollTop() + $child.position().top
        // }, 1000);
      },

      initialize: function(data) {
        this.html = `
          <div class="holder-title" id="holder-left-title">
          </div>
          <div class="holder-items" id="tweet-items">
          </div>
        `;

        this.$el.html(this.html);

        this.collection = new TweetCollection();
        this.tweetsView = new TweetsView({el: '#tweet-items', collection: this.collection});
        this.headingView = new PanelHeadingView({el: '#holder-left-title'});

        return this;
      },

      render: function(){
        this.headingView.render()
        this.tweetsView.render();
        return this;
      }

    });

    return PanelView;
});
