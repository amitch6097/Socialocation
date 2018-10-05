define('EventMediator', [
	'backbone',
	],
	function(
		Backbone,
	) {

		const EventMediator = function() {

			const events = {
				'twitter-clear': [],
				'collection-locations-loaded': [],
				'map-center-request': [],
				'item-hover-request': [],
				'map-model-assign-locations': [],
				'map-bounds-changed': [],
				'map-clear-all': [],
				'full-screen-request': [],
				'minimize-screen-request': [],
				'panel-change': [],
			};

			const listen = function(event, callback, obj) {
				if (!events[event]) { events[event] = []; }
				if (events[event] === undefined) {
					throw new Error("Event Not Recognized: " + event);
				}
				events[event].push({callback, obj});
				return this;
			};

			const emit = function(event, data) {
				if (!events[event]) { return false; }
				events[event].forEach((subscription) => {
					if (subscription.callback === undefined) { return; }
					subscription.callback.apply(subscription.obj, [data]);
				});
				return this;
			};

			return {
				listen,
				emit,
			};

		}();

		return EventMediator;
});
