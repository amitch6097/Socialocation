define('PanelView',[
  'backbone',
  'TweetCollection',
  'TweetsView',
  'PanelHeadingView',
  'Mediator'
  ],
  function(
    Backbone, TweetCollection, TweetsView, PanelHeadingView,Mediator
  ){

    var PanelView = Backbone.View.extend({

      events: {
        "click .button-twitter-result-type": "twitterPopularFetch",
        "map-click":"mapClicked"
      },

      mapClicked: function(e){
        console.log("PANEL VIEW: MAP CLICK");
      },

      twitterPopularFetch: function(e){
        let resultType = $(e.target).attr("data-url");
        console.log("PANEL VIEW:", resultType);
        this.collection.fetchData({geocode: "42.9634,-85.6681,1mi", result_type: resultType})
      },

      initialize: function(data) {
        this.html = `
          <div class="holder-title" id="holder-left-title">
          </div>
          <div class="holder-items" id="tweet-items">
          </div>
        `;

        this.$el.html(this.html);
        
        Mediator.subscribe("map-click", this.mapClicked, this);
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
