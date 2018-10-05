define('PanelHeadingView', [
	'backbone',
	'tpl!views/templates/panel_heading_view.tpl',
	],
	function(
		Backbone, PanelHeadingViewTemplate,
	) {

		const PanelHeadingView = Backbone.View.extend({

			initialize(data: any): void {
				this.el = data.el;

				this.template = PanelHeadingViewTemplate;
				$(this.el).html(this.template({heading: data.heading, uniqueName: data.uniqueName}));
			},

			render(): void {
				return this;
			},

		});

		return PanelHeadingView;
});

// <h1> Tweets </h1>
// <div id="twitter-search">
//   <input id="tweet-search-text" type="text">
//   <button id="tweet-search-submit" >Submit</button>
// </div>
// <div id="twitter-buttons">
//   <button class="button-twitter-result-type" data-url="popular" >Popular</button>
//   <button class="button-twitter-result-type" data-url="recent" >Recent</button>
//   <button class="button-twitter-result-type" data-url="mixed" >Mixed</button>
// </div>
