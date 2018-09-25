require.config({
  paths: {
    'jquery': 'lib/jquery/dist/jquery',
    'underscore': 'lib/underscore/underscore',
    'backbone': 'lib/backbone/backbone',
    'gmaps': 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB9-3aZldPIm53JmxMM4ATdZdJ6Gh0qw6s',
    'gmapsTwo': 'lib/markerCluster/markercluster',


    'EventMediator': 'helpers/event_mediator',
    'Router': 'models/router',

    'SingletonView': 'views/singleton_view',
    'ScrollView': 'views/scroll_view',

    'NavView': 'views/nav',
    'HomeView': 'views/home',
    'TweetView': 'views/tweet_view',
    'TweetsView': 'views/tweets_view',
    'MapView': 'views/map_view',
    'PanelView': 'views/panel_view',
    'PanelHeadingView': 'views/panel_heading_view',
    'TwitterView':'views/twitter_view',
    'ClusterView': 'views/cluster_view',
    'PanelTweetView': 'views/panel_tweet_view',

    'TweetModel': 'models/tweet_model',
    'LocationModel': 'models/location_model',
    'MapModel':'models/map_model',
    'MarkerModel': 'models/marker_model',
    'ClusterMarkerModel': 'models/cluster_marker_model',

    'TweetCollection': 'collections/tweet_collection'

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
