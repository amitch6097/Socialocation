define('HomeView',[
  'backbone',
  'TweetsView',
  'TweetCollection',
  'SingletonView'
  ],
  function(
    Backbone, TweetsView, TweetCollection, SingletonView
  ){

    var HomeView = Backbone.View.extend({

      initialize: function() {
        console.log('home init')
        var collection = new TweetCollection();
        this.tweetsView = new TweetsView({el: '#tweet-holder-left', collection: collection});

        var collectionTwo = new TweetCollection();
        this.tweetsViewTwo = new TweetsView({el: '#tweet-holder-right', collection: collectionTwo});

        return this;
      },

      render: function(){
        this.$el.html('<p>Home</p><div id="tweet-holder"><div id="tweet-holder-left"></div><div id="tweet-holder-right"></div></div>');
        this.tweetsView.render();
        this.tweetsViewTwo.render();
      }

    });

    // CREATE A SINGLETON

    return new SingletonView(HomeView);
});
