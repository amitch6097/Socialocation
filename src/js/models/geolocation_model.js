define('GeolocationModel',[
  'backbone',
  'gmaps'
  ],
  function(
    Backbone, EventMediator, gmaps
  ){

  var GeolocationModel = Backbone.Model.extend({

      url: "/api/geolocation",

      initialize: function () {
        this.params = {};
        this.geocoder = new google.maps.Geocoder();
        return this;
      },

      parseUserInput: function(input){
        let splitInput = input.split(",");
        if(isNaN(parseInt(splitInput[0])) &&
          isNaN(parseInt(splitInput[1]))
        ){
          this.fetchData(input);
          return;
        } else {
          this.parseLatLngLocation(splitInput);
          return;
        }
      },

      parseLatLngLocation: function(splitInput){
        // 42.9653,-85.6739
        let lat = parseFloat(splitInput[0]);
        let lng = parseFloat(splitInput[1]);
        this.dataLoaded({lat: lat, lng:lng});
      },

      fetchData: function(query){
        if(this.timeout){
          return;
        }
        this.timeout  = true;

        this.geocoder.geocode( { 'address': query}, (results, status) => {
          if (status == 'OK') {
            this.dataLoaded(results)
           } else {
             console.log('Geocode was not successful for the following reason: ' + status);
           }
        });

        setTimeout(() => {this.timeout = false;}, 1000);
      },

      dataLoaded: function(results){
        let lat = results[0].geometry.location.lat();
        let lng = results[0].geometry.location.lng();
        this.latlng = {lat: lat, lng: lng};
        this.trigger("change:latlng")
      },

  });

  return GeolocationModel;

});
