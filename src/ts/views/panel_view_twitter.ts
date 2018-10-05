define('PanelViewTwitter', [
	'backbone',
	'tpl!views/templates/panel_view_twitter.tpl',
	'PanelView',
	'PanelViewTweet',
	'TweetCollection',
	'SingletonView',
	'EventMediator',
	],
	function(
		Backbone, PanelViewTwitterTemplate, PanelView, PanelViewTweet, TweetCollection, SingletonView, EventMediator,
	) {

		const PanelViewTwitter = PanelView.extend({

			// "click .button-go-to-tweet-location": "tweetLocationRequest",
			// "click .button-twitter-result-type": "twitterFetchResultType",

			events: {
				"click .button-go-to-tweet-location": "tweetLocationRequest",
				"mouseenter .tweet-container": "tweetMouseHover",
				"click #tweet-search-submit": "tweetSearch",
				"click #twitter-hide": 'hide',
				"click #twitter-show": 'show',
				"click #twitter-pause": 'pause',
				"click #twitter-start": 'start',
			},

			initialize(options: any): void {
				this.collection = new TweetCollection(null, {bounds: options.bounds});
				this.removedIds = [];

				options['uniqueName'] = "twitter";
				options['subView'] = PanelViewTweet;
				options['heading'] = PanelViewTwitterTemplate();

				PanelView.prototype.initialize.apply(this, [options]);
			},

			showPanel(settings: App.Settings): void {
				this.collection.setSettings(settings);
				const css: object = {height: "95%", width: "330px" };

				this.changeView(this.holdHtml,
					css,
					{begin: {left: "-=500"}, end: {left: "+=500"}},
					this.collection.showIds,
					this.collection,
					this.removedIds,
				);
			},

			hidePanel(newHtml: string, settings: App.Settings): void {
				this.collectVisibleTweetIds();

				this.collection.setSettings(settings);
				this.holdHtml = $(this.el).html();

				const css = {height: "auto", width: "auto"};
				this.changeView(
					newHtml,
					css,
					{begin: {left: "-=500"}, end: {left: "+=500"}},
				);
			},

			collectVisibleTweetIds(): void {
				this.removedIds = [];
				const elementArray: JQuery<any> = $(this.el).find('.tweet-container');
				elementArray.each((index: number) => {
					const element: JQuery = elementArray[index];
					this.removedIds.push($(element).attr("data-url"));
				});
			},

			tweetLocationRequest(e: Event) {
				e.preventDefault();
				const latlng: string = $(e.target).attr("data-url");
				EventMediator.emit('map-center-request', JSON.parse(latlng));
			},

			// tweetScrollTo: function(){
			//   $('#panel-twitter-items').animate({
			//     scrollTop: $('#panel-twitter-items').scrollTop() + $(`#tweet-${this.collection.scrollTo}`).position().top
			//   }, 1000);
			// },

			tweetSearch(e: Event) {
				e.preventDefault();
				const searchValue: string = $("#tweet-search-text").val() as string;
				this.collection.setSearchValue(searchValue);
				this.clear();

			},

			tweetMouseHover(e: Event) {
				e.preventDefault();
				const id_str: string = $(e.currentTarget).attr("data-url");
				this.collection.selectHover(id_str);
			},

		});

		return new SingletonView(PanelViewTwitter);
});
