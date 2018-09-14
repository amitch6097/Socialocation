define('HomeView',[
  'backbone',
  'TweetsView',
  'TweetCollection',
  'SingletonView',
  'LocationModel'
  ],
  function(
    Backbone, TweetsView, TweetCollection, SingletonView, LocationModel
  ){

    var HomeView = Backbone.View.extend({

      initialize: function() {
        console.log('home init')
        var collection = new TweetCollection();
        this.tweetsView = new TweetsView({el: '#tweet-items', collection: collection});
        var locationModel = new LocationModel();
        // var collectionTwo = new TweetCollection();
        // this.tweetsViewTwo = new TweetsView({el: '#instagram-items', collection: collectionTwo});

        return this;
      },

      render: function(){
        this.$el.html(`
          <p>Home</p>
          <div id="home-view">
            <div class="holder" id="holder-left">
              <div class="holder-title">
                <h1> Tweets </h1>
                <div id="twitter-search">
                  <input type="text">
                  <button>Submit</button>
                </div>
                <div id="twitter-buttons">
                  <button>Popular</button>
                  <button>Recent</button>
                </div>
              </div>
              <div class="holder-items" id="tweet-items">
              </div>
            </div>
          </div>
          `);
        this.tweetsView.render();
        // this.tweetsViewTwo.render();
      }

    });

    // CREATE A SINGLETON

    return new SingletonView(HomeView);
});


// <div id="home-view">
//   <div class="holder" id="holder-left">
//     <div class="holder-title">
//       <h1> Tweets </h1>
//       <div id="twitter-search">
//         <input type="text">
//         <button>Submit</button>
//       </div>
//       <div id="twitter-buttons">
//         <button>Popular</button>
//         <button>Recent</button>
//       </div>
//     </div>
//     <div class="holder-items" id="tweet-items">
//     </div>
//   </div>
//   <div class="holder" id="holder-right">
//     <div class="holder-title">
//       <h1> Instagrams </h1>
//     </div>
//     <div class="holder-items" id="instagram-items">
//     </div>
//   </div>
// </div>
