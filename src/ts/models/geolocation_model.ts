/// <reference path="../../../types/index.d.ts" />

define('GeolocationModel', [
	'backbone',
	'gmaps',
	],
	function(
		Backbone, EventMediator, gmaps,
	) {

	const GeolocationModel = Backbone.Model.extend({

			defaults: {
				params : {},
				latlng : {},
				timeout : false,
				geocoder : new google.maps.Geocoder(),
			},

			parseUserInput(input: string): void {
				const splitInput: string[] = input.split(",");
				if (isNaN(parseInt(splitInput[0], undefined)) &&
					isNaN(parseInt(splitInput[1],  undefined))
				) {
					this.fetchData(input);
					return;
				} else {
					this.parseLatLngLocation(splitInput);
					return;
				}
			},

			parseLatLngLocation(splitInput: string[]): void {
				// 42.9653,-85.6739
				const lat: number = parseFloat(splitInput[0]);
				const lng: number = parseFloat(splitInput[1]);
				this.set('latlng', {lat, lng});
			},

			fetchData(query: string): void {
				const timeout: boolean = this.get('timeout');
				if (timeout) {
					return;
				}
				this.set('timeout', true);

				const geocoder: google.maps.Geocoder = this.get('geocoder');
				geocoder.geocode(
					{address: query},
					this.geocodeDataLoad.bind(this),
				);

				setTimeout(() => {this.set('timeout', false); }, 1000);
			},

			geocodeDataLoad(results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus): void {
				if (status === google.maps.GeocoderStatus.OK) {
					const lat: number = results[0].geometry.location.lat();
					const lng: number = results[0].geometry.location.lng();
					this.set('latlng', {lat, lng});
					} else {
						console.log('Geocode was not successful for the following reason: ' + status);
					}
			},

	});

	return GeolocationModel;

});
