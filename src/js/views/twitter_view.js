define('TwitterView',[
  'backbone',
  'PanelView',
  'PanelTweetView',
  'TweetCollection',
  'SingletonView',
  'EventMediator'
  ],
  function(
    Backbone, PanelView, PanelTweetView, TweetCollection, SingletonView, EventMediator
  ){

    var TwitterView = PanelView.extend({

      events: {
        "click .button-twitter-result-type": "twitterFetchResultType",
        "mouseenter .tweet-container": "tweetMouseHover",
        "click #tweet-search-submit": "tweetSearch",
        "click .button-go-to-tweet-location": "tweetLocationRequest",
        "click #twitter-remove": 'removeTwitter',
        "click #twitter-add": 'addTwitter'

      },

      initialize: function(options) {
        this.subView = PanelTweetView;
        this.uniqueName = "twitter";

        this.collection = new TweetCollection(null, {bounds: options.bounds});
        PanelView.prototype.initialize.apply(this, [options])

        this.collection.on("change:scrollTo", this.tweetScrollTo.bind(this));
        this.collection.on("change:newElements", this.scrollView.render.bind(this.scrollView));
      },

      addTwitter: function(){
        this.collection.setSettings({remove:false});

        $(this.el).animate({
          left: "-=500",
        }, 200, ()=>{
          $(this.el).html(this.holdHtml);
          $('#panel-twitter-items').empty();
          $(this.el).css({height: "90%"})
          $(this.el).animate({
            left: "+=500",
          }, 200, () =>{
            this.collection.forceRender();
          });
        });
      },

      removeTwitter: function(){
        this.collection.setSettings({remove:true})
        this.holdHtml = $(this.el).html();

        $(this.el).animate({
          left: "-=500",
        }, 200, ()=>{
          $(this.el).html(`<button id="twitter-add" >Add</button>`);
          $(this.el).css({height: "auto"})
          $(this.el).animate({
            left: "+=500",
          }, 200);
        });
      },

      tweetLocationRequest: function(e){
        e.preventDefault();
        let latlng = $(e.target).attr("data-url");
        EventMediator.emit('tweet-location-pressed', JSON.parse(latlng));
      },

      tweetScrollTo: function(){
        $('#panel-twitter-items').animate({
          scrollTop: $('#panel-twitter-items').scrollTop() + $(`#tweet-${this.collection.scrollTo}`).position().top
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
