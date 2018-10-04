"use strict";
require.config({
    paths: {
        'jquery': 'lib/jquery/dist/jquery.min',
        'underscore': 'lib/underscore/underscore-min',
        'backbone': 'lib/backbone/backbone-min',
        'tpl': 'lib/requirejs-tpl-bower/tpl',
        'gmaps': 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB9-3aZldPIm53JmxMM4ATdZdJ6Gh0qw6s',
        'markerclustererplus': 'lib/markerclustererplus/src/markerclusterer.min',
        'EventMediator': 'helpers/event_mediator',
        'Router': 'models/router',
        'SingletonView': 'views/singleton_view',
        'NavView': 'views/nav',
        'HomeView': 'views/home',
        'PanelView': 'views/panel_view',
        'PanelHeadingView': 'views/panel_heading_view',
        'ScrollView': 'views/scroll_view',
        'PanelViewTwitter': 'views/panel_view_twitter',
        'PanelViewTweet': 'views/panel_view_tweet',
        'PanelViewInstagram': 'views/panel_view_instagram',
        'PanelViewGram': 'views/panel_view_gram',
        'PopupView': 'views/popup_view',
        'GeolocationView': 'views/geolocation_view',
        'MapView': 'views/map_view',
        'InstagramView': 'views/instagram_view',
        'TweetView': 'views/tweet_view',
        'ItemModel': 'models/item_model',
        'ItemModelTweet': 'models/item_model_tweet',
        'ItemModelInstagram': 'models/item_model_instagram',
        'MapModel': 'models/map_model',
        'MarkerModel': 'models/marker_model',
        'ClusterModel': 'models/cluster_model',
        'GeolocationModel': 'models/geolocation_model',
        'PopupModel': 'models/popup_model',
        'ItemCollection': 'collections/item_collection',
        'TweetCollection': 'collections/tweet_collection',
        'InstagramCollection': 'collections/instagram_collection',
        'ScrollPopupModel': 'models/scroll_popup_model',
        'ScrollPopupView': 'views/scroll_popup_view',
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
require(['views/app'], function (AppView) {
    new AppView;
});
