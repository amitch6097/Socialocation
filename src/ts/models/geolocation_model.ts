/// <reference path="../../../types/index.d.ts" />

define('GeolocationModel',[
  'backbone',
  'gmaps'
  ],
  function(
    Backbone, EventMediator, gmaps
  ){

  var GeolocationModel = Backbone.Model.extend({

      defaults: {
        'params' : {},
        'latlng' : {},
        'timeout' : false,
        'geocoder' : new google.maps.Geocoder()
      },

      parseUserInput: function(input: string): void{
        let splitInput: string[] = input.split(",");
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

      parseLatLngLocation: function(splitInput: string[]): void{
        // 42.9653,-85.6739
        let lat:number = parseFloat(splitInput[0]);
        let lng:number = parseFloat(splitInput[1]);
        this.set('latlng', {lat: lat, lng: lng});
      },

      fetchData: function(query: string): void{
        const timeout: boolean = this.get('timeout');
        if(timeout){
          return;
        }
        this.set('timeout', true);

        const geocoder: google.maps.Geocoder = this.get('geocoder');
        geocoder.geocode(
          {'address': query},
          this.geocodeDataLoad.bind(this)
        );

        setTimeout(() => {this.set('timeout', false)}, 1000);
      },

      geocodeDataLoad: function(results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus): void{
        if (status === google.maps.GeocoderStatus.OK) {
          let lat: number = results[0].geometry.location.lat();
          let lng: number = results[0].geometry.location.lng();
          this.set('latlng', {lat: lat, lng: lng});
         } else {
           console.log('Geocode was not successful for the following reason: ' + status);
         }
      },

  });

  return GeolocationModel;

});
