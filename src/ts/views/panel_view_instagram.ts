define('PanelViewInstagram', [
	'backbone',
	'PanelView',
	'PanelViewGram',
	'InstagramCollection',
	'SingletonView',
	'EventMediator',
	'tpl!views/templates/panel_view_instagram.tpl',
	],
	function(
		Backbone, PanelView, PanelViewGram, InstagramCollection, SingletonView, EventMediator, PanelViewInstagramTemplate,
	) {

		const PanelViewInstagram = PanelView.extend({

			events: {
				"mouseenter .instagram-container": "mouseHover",
				"click #instagram-hide": 'hide',
				"click #instagram-show": 'show',
				"click #instagram-pause": 'pause',
				"click #instagram-start": 'start',
			},

			initialize(options: any): void {
				this.collection = new InstagramCollection(null, {bounds: options.bounds});

				// this.subView = PanelViewGram;
				// this.uniqueName = "instagram";

				// this.collection = new InstagramCollection(null, {bounds: options.bounds});
				options['uniqueName'] = "instagram";
				options['subView'] = PanelViewGram;
				options['heading'] = PanelViewInstagramTemplate();

				PanelView.prototype.initialize.apply(this, [options]);
			},

			mouseHover(e: Event): void {
				e.preventDefault();
				const id_str: string = $(e.currentTarget).attr("data-url");
				this.collection.selectHover(id_str);
			},

			showPanel(settings: App.Settings): void {
				this.collection.setSettings(settings);
				const html: string = this.holdHtml;
				const css: object = {height: "95%", width: "330px" };
				this.changeView(
					html,
					css,
					{begin: {right: "-=500"}, end: {right: "+=500"}},
				);
			},

			hidePanel(newHtml: string, settings: App.Settings): void {
				this.holdHtml = $(this.el).html();
				this.collection.setSettings(settings);

				const css: object = {height: "auto", width: "auto"};
				this.changeView(
					newHtml,
					css,
					{begin: {right: "-=500"}, end: {right: "+=500"}},
				);
			},

		});

		return new SingletonView(PanelViewInstagram);
});
