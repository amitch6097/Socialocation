/// <reference path="../../../types/index.d.ts" />

define('MapModel', [
	'backbone',
	'underscore',
	'EventMediator',
	'ClusterModel',
	'MarkerModel',
	],
	function(
		Backbone, _, EventMediator, ClusterModel, MarkerModel,
	) {

	const PARSE_LAT_LNG = function(num: number): number {
		// @ts-ignore: error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
		return parseInt(10000 * num, undefined) / 10000;
	};

	const MapModel = Backbone.Model.extend({

			defaults: {
				selected: undefined,
				mapParams: {},
			},

			initialize(data: any): void {
				this.map = new google.maps.Map(data.mapELE, {
					zoom: 16,
					center: new google.maps.LatLng(
						PARSE_LAT_LNG(data.bounds.center.lat),
						PARSE_LAT_LNG(data.bounds.center.lng),
					),
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					disableDefaultUI: true,
				});
				this.clusters = new ClusterModel(this.map, []);
			},

			updateLocationMarker(latlng: App.LatLng): void {
				this.clearCurrentLocationMarker();

				const markerParams: App.MarkerParams = {
					position: latlng,
					label: "",
					map: this.map,
				};

				this.currentLocationMarker = new google.maps.Marker(markerParams);
			},

			clear(): void {
				this.clearCurrentLocationMarker();
				this.clusters.clear();
			},

			clearCurrentLocationMarker(): void {
				if (this.currentLocationMarker !== undefined) {
					this.currentLocationMarker.setMap(null);
				}
			},

			addLocations(locations: App.Locations): void {

				let markers: App.Marker[] = [];

				let subscriber: string;
				for (subscriber in locations) {
					if (locations.hasOwnProperty(subscriber)) {
						markers = locations[subscriber].map((model: App.ItemModel) => {
								return new MarkerModel(model);
						});
					}

				}

				this.clusters.addMarkers(markers);
			},

			updateSelectedCluster(cluster: any) {
				const lat: number = cluster.center_.lat();
				const lng: number = cluster.center_.lng();

				const markers: App.Marker[] = cluster.markers_;
				markers.forEach((marker: App.Marker) => {
					marker.model.show();
				});

				this.set('selected', markers[0].model);
				this.updateLocationMarker({lat, lng});
			},

			updateBounds() {
				const bounds: any = this.map.getBounds();
				const center: google.maps.LatLng = this.map.getCenter();
				const clusters: App.Cluster[] = this.clusters.getClusters();

				const lat: number = center.lat();
				const lng: number = center.lng();

				const latf: number = bounds.f.b;
				const lngb: number = bounds.b.b;

				const distLat: number = Math.abs(lat - latf);
				const distLng: number = Math.abs(lng - lngb);

				const distMax: number = Math.max(distLat, distLng);

				const params: App.Params = {
					bounds: {
						center: {
							lat,
							lng,
						},
						dist: distMax,
					},
					clusters,
				};

				let cluster: App.Cluster;
				for (cluster of clusters) {

					let marker: App.Marker;
					for (marker of cluster.markers_) {
						marker.model.changeVisible(true);
					}
				}

				this.set('mapParams', params);
			},
	});

	return MapModel;

});
