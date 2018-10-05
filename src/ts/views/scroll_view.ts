define('ScrollView', [
	'backbone',
	],
	function(
		Backbone,
	) {
		const initScrollView = function(viewObj) {

			const ScrollView = Backbone.View.extend({

				initialize(data: any): void {
					this.collection = data.collection;
					this.el = data.el;
				},

				clear(): void {
					$(this.el).empty();
				},
				render(): void {
					this.collection.each((model: App.ItemModel) => {
						const view = new viewObj({
							el: this.el,
							model,
						});
					});
					return this;
				},
			});

			return ScrollView;
		};

		return initScrollView;
});
