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
        // $.ajax({
        //   type: "POST",
        //   url: "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBpPKyzIE9leeafpjcUGkmfJiUAqstjTMg",
        //   success: function(response){
        //     console.log(response);
        //   }
        // });

        return this;
      },

  });

  return LocationModel;

});
