define('ItemModelTweet', [
	'backbone',
	'ItemModel',
	],
	function(
		Backbone, ItemModel,
	) {

	const ItemModelTweet = ItemModel.extend({

			defaults: {
				modelType: "twitter",
				selected: false,
				visible: false,
			},

			initialize(data: any) {
				this.id_str = data.id_str;
			},

			getLink(): string {
				const username: string = this.get('username');
				const id_str: string = this.get('id_str');
				const link: string = `https://twitter.com/${username}/status/${id_str}`;
				return link;
			},
	});

	return ItemModelTweet;

});
