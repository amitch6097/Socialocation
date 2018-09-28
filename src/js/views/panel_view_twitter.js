define('PanelViewTwitter',[
  'backbone',
  'tpl!views/templates/panel_view_twitter.tpl',
  'PanelView',
  'PanelViewTweet',
  'TweetCollection',
  'SingletonView',
  'EventMediator',
  ],
  function(
    Backbone, PanelViewTwitterTemplate, PanelView, PanelViewTweet, TweetCollection, SingletonView, EventMediator
  ){

    var PanelViewTwitter = PanelView.extend({

      // "click .button-go-to-tweet-location": "tweetLocationRequest",
      // "click .button-twitter-result-type": "twitterFetchResultType",

      events: {
        "click .button-go-to-tweet-location": "tweetLocationRequest",
        "mouseenter .tweet-container": "tweetMouseHover",
        "click #tweet-search-submit": "tweetSearch",
        "click #twitter-hide": 'hide',
        "click #twitter-show": 'show',
        "click #twitter-pause": 'pause',
        "click #twitter-start": 'start'
      },

      initialize: function(options) {
        this.subView = PanelViewTweet;
        this.uniqueName = "twitter";
        this.removedIds = [];
        this.heading = PanelViewTwitterTemplate();

        this.collection = new TweetCollection(null, {bounds: options.bounds});

        PanelView.prototype.initialize.apply(this, [options]);
      },

      showPanel: function(settings){
        this.collection.setSettings(settings);
        let css = {height: "90%"};
        this.changeView(this.holdHtml,
          css,
          {begin: {left: "-=500"}, end: {left: "+=500"}},
          this.collection.showIds,
          this.collection,
          this.removedIds
        );
      },

      hidePanel: function(newHtml, settings){
        this.collectVisibleTweetIds();

        this.collection.setSettings(settings)
        this.holdHtml = $(this.el).html();

        let css = {height: "auto"};
        this.changeView(
          newHtml,
          css,
          {begin: {left: "-=500"}, end: {left: "+=500"}}
        );
      },

      collectVisibleTweetIds: function(){
        this.removedIds = [];
        let elementArray = $(this.el).find('.tweet-container');
        elementArray.each((index) =>{
          let element = elementArray[index];
          this.removedIds.push($(element).attr("data-url"))
        });
      },

      tweetLocationRequest: function(e){
        e.preventDefault();
        let latlng = $(e.target).attr("data-url");
        console.log(latlng)
        EventMediator.emit('map-center-request', JSON.parse(latlng));
      },

      // tweetScrollTo: function(){
      //   $('#panel-twitter-items').animate({
      //     scrollTop: $('#panel-twitter-items').scrollTop() + $(`#tweet-${this.collection.scrollTo}`).position().top
      //   }, 1000);
      // },

      tweetSearch: function(e){
        e.preventDefault();
        let searchValue = $("#tweet-search-text").val();
        this.collection.setSearchValue(searchValue);
        this.clear();
        this.collection.clear();
      },

      tweetMouseHover: function(e){
        e.preventDefault();
        let id_str = $(e.currentTarget).attr("data-url");
        this.collection.selectHover(id_str);
      },

    });

    return new SingletonView(PanelViewTwitter);
});
