/// <reference path="../../../types/index.d.ts" />

define('GeolocationView', [
	'backbone',
	'tpl!views/templates/geolocation_view.tpl',
	'GeolocationModel',
	'EventMediator',
	],
	function(
		Backbone, GeolocationViewTemplate, GeolocationModel, EventMediator,
	) {

		const GeolocationView = Backbone.View.extend({

			events: {
				"click #map-button-search": "userLocationInput",
				"click #screen-switch-button": "screenSwitch",
			},

			initialize(data: any): void {
				this.model = new GeolocationModel({});
				this.html = GeolocationViewTemplate();
				$(this.el).html(this.html);
				this.model.on("change:latlng", this.modelLocationLoaded.bind(this));
			},

			ForceMinimizedView(): void {
				$('#screen-switch-button').html("Full Screen");
				$('#screen-switch-button').attr('data-url', 'full-screen-request');
				EventMediator.emit('minimize-screen-request', 'minimize-screen-request');
			},

			screenSwitch(e: Event): void {
				const request = $(e.target).attr('data-url');

				if (request === 'full-screen-request') {
					$(e.target).html("Revert");
					$(e.target).attr('data-url', 'minimize-screen-request');
				} else {
					$(e.target).html("Full Screen");
					$(e.target).attr('data-url', 'full-screen-request');
				}

				EventMediator.emit(request, request);
			},

			userLocationInput(e: Event): void {
				const input: string | undefined = $('#map-search-text').val() as string;
				this.model.parseUserInput(input);
				EventMediator.emit('map-clear-all');
			},

			modelLocationLoaded(model, value: App.LatLng): void {
				EventMediator.emit('map-center-request', value);
			},
		});

		return GeolocationView;
});
