define('TweetsView',[
  'backbone',
  'TweetView',
  'HolderView',
  'SingletonView'
  ],
  function(
    Backbone, TweetView, HolderView, SingletonView
  ){

    var TweetsView = new HolderView(TweetView);
    return TweetsView;
});
