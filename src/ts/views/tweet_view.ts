define('TweetView', [
	'backbone',
	'tpl!views/templates/tweet_view.tpl',
	],
	function(
		Backbone, TweetViewTemplate,
	) {

		const TweetView = Backbone.View.extend({

			initialize(data: any): void {
				this.model = data.model;
				this.el = data.el;

				this.template = TweetViewTemplate;
				const link: string = this.model.getLink();
				this.html = this.template({
					link,
				});
			},

			render(): void {
				$(this.el).append(this.html);
			},

		});

		return TweetView;
});
