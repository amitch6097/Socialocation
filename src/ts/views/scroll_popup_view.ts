define("ScrollPopupView", [
	"backbone",
	"tpl!views/templates/scroll_popup_view.tpl",
	"ScrollPopupModel",
	"TweetView",
	"InstagramView",
	"EventMediator",
	],
	function(
		Backbone, ScrollPopupViewTemplate, ScrollPopupModel, TweetView, InstagramView, EventMediator,
	) {

		const SELF_FLEX = [
			"flex-start",
			"flex-end",
			"center",
			"baseline",
			"stretch",
		];

		const VIEW_TYPES  = {
			twitter : TweetView,
			instagram : InstagramView,
		};

		const ScrollPopupView = Backbone.View.extend({

			events: {
				click: "empty",
			},

			initialize(data: any): void {
				this.model = new ScrollPopupModel({});
				this.model.on("change:markers", this.render, this);
				EventMediator.listen("panel-change", this.empty, this);
				EventMediator.listen("minimize-screen-request", this.empty, this);
			},

			render(): void {

				const leftPanelData: string = $("#panel-twitter").attr("data-url") as string;
				const rigthPanelData: string = $("#panel-instagram").attr("data-url") as string;

				const leftPanelOpen: number = leftPanelData === "pause" || leftPanelData === "hide" ? 0 : 330;
				const rightPanelOpen: number = rigthPanelData === "pause" || rigthPanelData === "hide" ? 0 : 330;

				const left: number = leftPanelOpen;
				const width: number = $( window ).width() - (leftPanelOpen + rightPanelOpen);

				this.$el.empty();
				this.$el.css({
					"left": left,
					"width": width,
					"height": $( window ).height() - 80,
					"z-index": 3,
				});

				const markers: App.MarkerModel[] = this.model.get("markers");
				const markersClone: App.MarkerModel[] = markers.slice(0);
				let i = 0;

				while (markersClone.length > 0) {
					const marker: App.MarkerModel = markersClone.splice(markersClone.length * Math.random() | 0, 1)[0];

					const modelType: string = marker.model.get("modelType");
					const viewObject: any = VIEW_TYPES[modelType];
					const randomWidth: number = (Math.random() * 200) + 200;
					const id = `${i}-popup-container`;

					const item = new viewObject({
						el: this.$el,
						model: marker.model,
						randomWidth,
						id,
					});

					item.render();

					const index: number = Math.round(4 * Math.random());
					const flex: string = SELF_FLEX[index];
					$(`#${id}`).css("align-self", flex);

					i++;
				}
			},

			empty(): void {
				this.$el.css({
					"width": 0,
					"height": 0,
					"z-index": 0,
				});
				this.$el.empty();
			},

			populate(cluster: any): void {
				this.model.populate(cluster);
			},

		});

		return ScrollPopupView;
});
