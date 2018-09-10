require.config({
  paths: {
    'jquery': 'lib/jquery/dist/jquery',
    'underscore': 'lib/underscore/underscore',
    'backbone': 'lib/backbone/backbone',
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