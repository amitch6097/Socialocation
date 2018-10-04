"use strict";
define('GeolocationModel', [
    'backbone',
    'gmaps'
], function (Backbone, EventMediator, gmaps) {
    var GeolocationModel = Backbone.Model.extend({
        defaults: {
            'params': {},
            'latlng': {},
            'timeout': false,
            'geocoder': new google.maps.Geocoder()
        },
        parseUserInput: function (input) {
            let splitInput = input.split(",");
            if (isNaN(parseInt(splitInput[0])) &&
                isNaN(parseInt(splitInput[1]))) {
                this.fetchData(input);
                return;
            }
            else {
                this.parseLatLngLocation(splitInput);
                return;
            }
        },
        parseLatLngLocation: function (splitInput) {
            let lat = parseFloat(splitInput[0]);
            let lng = parseFloat(splitInput[1]);
            this.set('latlng', { lat: lat, lng: lng });
        },
        fetchData: function (query) {
            const timeout = this.get('timeout');
            if (timeout) {
                return;
            }
            this.set('timeout', true);
            const geocoder = this.get('geocoder');
            geocoder.geocode({ 'address': query }, this.geocodeDataLoad.bind(this));
            setTimeout(() => { this.set('timeout', false); }, 1000);
        },
        geocodeDataLoad: function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                let lat = results[0].geometry.location.lat();
                let lng = results[0].geometry.location.lng();
                this.set('latlng', { lat: lat, lng: lng });
            }
            else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        },
    });
    return GeolocationModel;
});
