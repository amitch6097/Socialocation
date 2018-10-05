/// <reference path="../../../types/index.d.ts" />

define('ClusterModel', [
	'gmaps',
	'markerclustererplus',
	],
	function(
		gmaps, markerclustererplus,
	) {

		const ClusterModel: any = function(map: google.maps.Map , markers: google.maps.Marker[], events: App.Event[]): any {
			// @ts-ignore: error TS2304: Cannot find name 'MarkerClusterer'.
			const cluster: any = new MarkerClusterer(map, markers, {
				zoomOnClick: false,
				imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
				minimumClusterSize: 1,
			});

			if (events !== undefined) {
				// [{listen:"event", context:"this", callback:"func"}, ...]
				events.forEach((item: App.Event) => {
					google.maps.event.addListener(cluster, item.listen, (clusterItem: any) => {
						item.callback.apply(item.context, [clusterItem]);
					});
				});
			}
			// @ts-ignore: error TS2304: Cannot find name 'MarkerClusterer'.
			MarkerClusterer.prototype.clear = function(): void {
				this.clearMarkers();
				this.clusters_ = [];
				this.repaint();
			};

			return cluster;
		};

		return ClusterModel;
});
