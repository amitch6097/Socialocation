define('LocationModel',[
  'backbone'
  ],
  function(
    Backbone
  ){

  var LocationModel = Backbone.Model.extend({

      initialize: function (data) {
        $.post(
          'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBpPKyzIE9leeafpjcUGkmfJiUAqstjTMg',
          function(data){
            console.log(data)
        });

        return this;
      },

  });

  return LocationModel;

});
