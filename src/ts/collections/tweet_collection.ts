/// <reference path="../../../types/index.d.ts" />

define('TweetCollection',[
	'backbone',
  'ItemModelTweet',
  'ItemCollection',
	'EventMediator'
], function (
  Backbone, ItemModelTweet, ItemCollection, EventMediator
){
  var LAT_LNG_TO_MILES = function(miles: number): number {return miles*69;}

	var TweetCollection = ItemCollection.extend({

      model: ItemModelTweet,
      url: '/api/tweets',

      boundsQueryToString: function(bounds: App.Bounds): string{
        return `${bounds.center.lat},${bounds.center.lng},${LAT_LNG_TO_MILES(bounds.dist)}mi`;
      },

      initialize: function(models: App.ItemModel[], options: any){
				this.attributeSet({
					bounds : options.bounds,
					timeout : false,
					scrollTo : undefined,
					clusters : [],
					allModels : {},
					params : {
						geocode: this.boundsQueryToString(options.bounds)
					},
					settings : {
						hide: false,
						pause: false,
					},
				});

        this.fetchData(this.attributeGet('params'));
      },

			mapBoundsChange: function(data: App.Params){
				this.attributeSet({
					bounds: data.bounds,
					clusters: data.clusters
				});

				const query: any = {geocode: this.boundsQueryToString(data.bounds)}
				const oldGeocode: any = this.attributeGet('params').geocode;

        if(query.geocode === oldGeocode) return;

				ItemCollection.prototype.mapBoundsChange.apply(this, [query])
			},

      clear: function(): void{
				ItemCollection.prototype.clear.apply(this)
        EventMediator.emit('twitter-cleared', null);
      },

      setSearchValue: function(searchValue: string){
				let params = this.attributeGet('params');
        params = Object.assign(params, {q:searchValue});
				this.attributeSet('params', params);
      },

			showIds: function(ids: string[]){
				const allModels: App.IndexedItemModels = this.attributeGet('allModels');
				try {

					ids.forEach((id: string) => {
						allModels[id].show();
					});

				} catch( err ){
					console.log(err);
					this.fetchData(this.attributeGet('params'));
				}

			},

    });

	return TweetCollection;
});
