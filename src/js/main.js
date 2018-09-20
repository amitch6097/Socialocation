require.config({
  paths: {
    'jquery': 'lib/jquery/dist/jquery',
    'underscore': 'lib/underscore/underscore',
    'backbone': 'lib/backbone/backbone',
    'gmaps': 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB9-3aZldPIm53JmxMM4ATdZdJ6Gh0qw6s',
    'gmapsTwo': 'https://cdnjs.cloudflare.com/ajax/libs/markerclustererplus/2.1.4/markerclusterer.js?',


    'EventMediator': 'helpers/EventMediator',

    'SingletonView': 'views/SingletonView',
    'ScrollView': 'views/ScrollView',

    'NavView': 'views/nav',
    'HomeView': 'views/home',
    'TweetView': 'views/tweetView',
    'TweetsView': 'views/tweetsView',
    'MapView': 'views/MapView',
    'PanelView': 'views/PanelView',
    'PanelHeadingView': 'views/PanelHeadingView',
    'TwitterView':'views/TwitterView',

    'TweetModel': 'models/tweetModel',
    'LocationModel': 'models/locationModel',
    'MapModel':'models/mapModel',
    'MarkerModel': 'models/MarkerModel',
    'ClusterMarkerModel': 'models/ClusterMarkerModel',

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
