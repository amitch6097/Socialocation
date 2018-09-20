define('TwitterView',[
  'backbone',
  'PanelView',
  'TweetView',
  'TweetCollection',
  'SingletonView'
  ],
  function(
    Backbone, PanelView, TweetView, TweetCollection, SingletonView
  ){

    var TwitterView = PanelView.extend({

      events: {
        "click .button-twitter-result-type": "twitterFetchResultType",
        "mouseenter .tweet-container": "tweetMouseHover",
        "click #tweet-search-submit": "tweetSearch",
      },

      initialize: function(options) {
        this.subView = TweetView;
        this.uniqueName = "twitter";

        this.collection = new TweetCollection();
        PanelView.prototype.initialize.apply(this, [options])

        this.collection.on("change:scrollTo", this.scrollTo.bind(this));
        this.collection.on("change:visibleElements", this.scrollView.render.bind(this.scrollView));
      },

      scrollTo: function(){
        $('.panel-twitter-items').animate({
          scrollTop: $(this.el).scrollTop() + $(`#tweet-${this.collection.scrollTo}`).position().top
        }, 1000);
      },

      tweetSearch: function(e){
        e.preventDefault();
        let searchValue = $("#tweet-search-text").val();
        this.collection.tweetSearch(searchValue);
      },

      twitterFetchResultType: function(e){
        e.preventDefault();
        let resultType = $(e.target).attr("data-url");
        this.collection.fetchData({result_type: resultType})
      },

      tweetMouseHover: function(e){
        e.preventDefault();
        let cid = $(e.currentTarget).attr("data-url");
        this.collection.selectTweetHover(cid);
      },

    });

    return new SingletonView(TwitterView);
});
