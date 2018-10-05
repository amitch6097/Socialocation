define('SingletonView', [
	'backbone',
	],
	function(
		Backbone,
	) {

		const SingletonView = function(obj: any) {

			let instance: any;

			const createInstance = function(params: any) {
				if (instance === undefined) {
					instance = new obj(params);
				}
				return instance;
			};

			return createInstance;
		};

		return SingletonView;
});
