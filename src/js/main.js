require.config({
  paths: {
    'jquery': 'lib/jquery/dist/jquery',
    'underscore': 'lib/underscore/underscore',
    'backbone': 'lib/backbone/backbone',

    'SingletonView': 'views/SingletonView',
    'HolderView': 'views/HolderView',


    'NavView': 'views/nav',
    'HomeView': 'views/home',
    'NewView': 'views/new',
    'BoxView': 'views/box',
    'BoxesView': 'views/boxes',
    'TweetView': 'views/tweetView',
    'TweetsView': 'views/tweetsView',


    'NavModel': 'models/nav',
    'BoxModel': 'models/box',
    'TweetModel': 'models/tweetModel',
    'LocationModel': 'models/locationModel',

    'BoxesCollection': 'collections/boxes',
    'TweetCollection': 'collections/TweetCollection'

  },
  shim: {
      underscore: {
          exports: '_'
      },
      backbone: {
          exports: 'Backbone',
          deps: ['jquery', 'underscore']
      }
  },
  deps: ['jquery', 'underscore']
});

require(['views/app'], function(AppView) {
  new AppView;
});
