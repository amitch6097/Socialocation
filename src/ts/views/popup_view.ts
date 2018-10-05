define('PopupView', [
	'backbone',
	'tpl!views/templates/popup_view.tpl',
	'PopupModel',
	'TweetView',
	'InstagramView',
	'EventMediator',
	],
	function(
		Backbone, PopupViewTemplate, PopupModel, TweetView, InstagramView, EventMediator,
	) {

		const VIEW_TYPES  = {
			twitter : TweetView,
			instagram : InstagramView,
		};

		const PopupView = Backbone.View.extend({

			events: {
				"click #holder-title-previous": "previous",
				"click #holder-title-next": "next",
			},

			initialize(data: any): void {
				this.subElement = '#holder-map-items';
				this.model = new PopupModel({});
				this.model.on('change:marker', this.render, this);
				EventMediator.listen('full-screen-request', this.empty, this);

			},

			render(): void {
				this.$el.html(PopupViewTemplate());
				$(this.subElement).empty();
				const point: google.maps.Point = this.model.get('point');
				const previous: boolean = this.model.get('previous');
				const next: boolean = this.model.get('next');
				const hidden: boolean = !previous && !next;
				if (hidden === true) {
					$("#holder-map-title").empty();
				}
				$("#holder-title-previous").prop("disabled", !previous);
				$("#holder-title-next").prop("disabled", !next);
				this.$el.css({left: point.x, top: point.y});
				this.addItem();
				this.$el.css({visibility: "visible"});
				this.$el.css({ 'max-height': 'calc(100% - ' + point.y + 'px)' });
				$(this.subElement).css({ 'max-height': 'calc(100% - ' + point.y + 'px)' });
			},

			addItem(model: Backbone.Model) {
				const itemModel: Backbone.Model = this.model.get('marker').model;
				const modelType: string = itemModel.get('modelType');
				const viewObject: any = VIEW_TYPES[modelType];
				const item = new viewObject({
					el: this.subElement,
					model: itemModel,
				});
				item.render();
		},

			empty(): void {
				this.$el.css({visibility: "hidden"});
				$(this.subElement).empty();
			},

			populate(cluster: any): void {
				this.model.populate(cluster);
			},

			next(): void {
				this.model.next();
			},

			previous(): void {
				this.model.previous();
			},

		});

		return PopupView;
});
