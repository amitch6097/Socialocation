require.config({
  paths: {
    'jquery': 'lib/jquery/dist/jquery',
    'underscore': 'lib/underscore/underscore',
    'backbone': 'lib/backbone/backbone',
    'gmaps': 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB9-3aZldPIm53JmxMM4ATdZdJ6Gh0qw6s',
    'gmapsTwo': 'https://cdnjs.cloudflare.com/ajax/libs/markerclustererplus/2.1.4/markerclusterer.js?',


    'EventMediator': 'helpers/EventMediator',

    'SingletonView': 'views/SingletonView',
    'HolderView': 'views/HolderView',

    'NavView': 'views/nav',
    'HomeView': 'views/home',
    'NewView': 'views/new',
    'BoxView': 'views/box',
    'BoxesView': 'views/boxes',
    'TweetView': 'views/tweetView',
    'TweetsView': 'views/tweetsView',
    'MapView': 'views/MapView',
    'PanelView': 'views/PanelView',
    'PanelHeadingView': 'views/PanelHeadingView',


    'NavModel': 'models/nav',
    'BoxModel': 'models/box',
    'TweetModel': 'models/tweetModel',
    'LocationModel': 'models/locationModel',
    'MapModel':'models/mapModel',

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
      },
      gmaps: {
        exports: 'google.maps'
      }
  },
  deps: ['jquery', 'underscore']
});

require(['views/app'], function(AppView) {
  new AppView;
});
