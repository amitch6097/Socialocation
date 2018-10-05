'use strict';
require.config({
  paths: {
    'jquery': 'lib/jquery/dist/jquery.min',
    'underscore': 'lib/underscore/underscore-min',
    'backbone': 'lib/backbone/backbone-min',
    'tpl': 'lib/requirejs-tpl-bower/tpl',
    'gmaps': 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB9-3aZldPIm53JmxMM4ATdZdJ6Gh0qw6s',
    'markerclustererplus': 'lib/markerclustererplus/src/markerclusterer.min',
    'EventMediator': 'scripts',
    'Router': 'scripts',
    'SingletonView': 'scripts',
    'NavView': 'scripts',
    'HomeView': 'scripts',
    'PanelView': 'scripts',
    'PanelHeadingView': 'scripts',
    'ScrollView': 'scripts',
    'PanelViewTwitter': 'scripts',
    'PanelViewTweet': 'scripts',
    'PanelViewInstagram': 'scripts',
    'PanelViewGram': 'scripts',
    'PopupView': 'scripts',
    'GeolocationView': 'scripts',
    'MapView': 'scripts',
    'InstagramView': 'scripts',
    'TweetView': 'scripts',
    'ItemModel': 'scripts',
    'ItemModelTweet': 'scripts',
    'ItemModelInstagram': 'scripts',
    'MapModel': 'scripts',
    'MarkerModel': 'scripts',
    'ClusterModel': 'scripts',
    'GeolocationModel': 'scripts',
    'PopupModel': 'scripts',
    'ItemCollection': 'scripts',
    'TweetCollection': 'scripts',
    'InstagramCollection': 'scripts',
  },
  shim: {
    underscore: {
      exports: '_',
    },
    backbone: {
      exports: 'Backbone',
      deps: ['jquery', 'underscore'],
    },
    gmaps: {
      exports: 'google.maps',
    },
  },
  deps: ['jquery', 'underscore'],
});
require(['scripts'], function(AppView) {
  new AppView;
});
