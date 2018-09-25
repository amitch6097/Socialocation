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
        let html = this.holdHtml
        let css = {height: "90%"};
        let callback = this.collection.forceRender;
        let context = this.collection;
        this.changeView(this.holdHtml, css, callback, context);
      },

      removeTwitter: function(){
        this.collection.setSettings({remove:true})
        this.holdHtml = $(this.el).html();
        let html = `<button id="twitter-add" >Add</button>`;
        let css = {height: "auto"};
        this.changeView(html, css);
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
        console.log("tweet search")
        e.preventDefault();
        let searchValue = $("#tweet-search-text").val();
        this.collection.setSearchValue(searchValue);
        this.clear();
        this.collection.clear();
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

      changeView: function(html, css, callback, context){
        $(this.el).animate({
          left: "-=500",
        }, 200, ()=>{
          $(this.el).html(html);
          $(this.el).css(css)
          $(this.el).animate({
            left: "+=500",
          }, 200, () => {
            if(callback !== undefined){
              callback.call(context);
            }
          });
        });
      },

    });

    return new SingletonView(TwitterView);
});
