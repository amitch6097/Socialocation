define('ItemModel', [
	'backbone',
	],
	function(
		Backbone,
	) {

	const ItemModel = Backbone.Model.extend({

			show(): void {
				this.changeVisible(true);
				this.updateView();
			},

			hide(): void {
				this.changeVisible(false);
				this.updateView();
			},

			changeVisible(value: boolean): void {
				this.set('visible', value);
			},
			updateView(): void {
				this.trigger('change:update');
			},

			getLink(): string {
				throw new Error("NEED TO IMPLMENT GET LINK");
			},
	});

	return ItemModel;

});
