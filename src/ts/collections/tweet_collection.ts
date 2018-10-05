/// <reference path="../../../types/index.d.ts" />

define('TweetCollection', [
	'backbone',
	'ItemModelTweet',
	'ItemCollection',
	'EventMediator',
], function(
	Backbone, ItemModelTweet, ItemCollection, EventMediator,
) {
	const LAT_LNG_TO_MILES = function(miles: number): number {return miles * 69; };
	const TweetCollection = ItemCollection.extend({

		model: ItemModelTweet,
		url: '/api/tweets',

		boundsQueryToString(bounds: App.Bounds): string {
			return `${bounds.center.lat},${bounds.center.lng},${LAT_LNG_TO_MILES(bounds.dist)}mi`;
		},

		initialize(models: App.ItemModel[], options: any) {
			this.attributeSet({
				bounds :  options.bounds,
				timeout : false,
				scrollTo : undefined,
				clusters : [],
				allModels : {},
				params : {
					geocode: this.boundsQueryToString(options.bounds),
				},
				settings : {
					hide: false,
					pause: false,
				},
			});

			this.fetchData(this.attributeGet('params'));
		},

		mapBoundsChange(data: App.Params) {
			this.attributeSet({
				bounds: data.bounds,
				clusters: data.clusters,
			});

			const query: any = {geocode: this.boundsQueryToString(data.bounds)};
			const oldGeocode: any = this.attributeGet('params').geocode;

			if (query.geocode === oldGeocode) { return; }

			ItemCollection.prototype.mapBoundsChange.apply(this, [query]);
		},

		clear(): void {
			ItemCollection.prototype.clear.apply(this);
			EventMediator.emit('twitter-cleared', null);
		},

		setSearchValue(searchValue: string) {
			let params = this.attributeGet('params');
			params = Object.assign(params, {q: searchValue});
			this.attributeSet('params', params);
		},

		showIds(ids: string[]) {
			const allModels: App.IndexedItemModels = this.attributeGet('allModels');
			try {
				ids.forEach((id: string) => {
					allModels[id].show();
				});
			} catch ( err ) {
				console.log(err);
				this.fetchData(this.attributeGet('params'));
			}
		},

		});

 return TweetCollection;
});
