/// <reference path="../../../types/index.d.ts" />

define('Router', [
	'backbone',
	'HomeView',
	'EventMediator',
	],
	function(
		Backbone, HomeView, EventMediator,
	) {

	const Router = Backbone.Router.extend({

		routes: {
			"location/:lat/:lng/:dist": "location",
		},

		initialize(options: any): void {
			this.homeView;
			this.homeViewHasRendered = false;
			EventMediator.listen('map-bounds-changed', this.updateURL, this);
		},

		start(): void {
			if (!this.homeViewHasRendered) {
				this.homeView = new HomeView({el: "#app-main", bounds: undefined});
			}
		},

		updateURL(data: App.Params): void {
			const bounds: App.Bounds = data.bounds;
			const center: App.LatLng = bounds.center;

			const URLoptions: string = `location/${center.lat}/${center.lng}/${bounds.dist}`;
			this.navigate(URLoptions, {trigger: false});
		},

		location(lat: string, lng: string, dist: string): void {
			this.homeViewHasRendered = true;
			const bounds: App.Bounds = {
				center: {
					lat: parseFloat(lat),
					lng: parseFloat(lng),
				},
				dist: parseFloat(dist),
			};
			this.homeView = new HomeView({el: "#app-main", bounds});
		},

	});

	return Router;

});
