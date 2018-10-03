/// <reference path="../../../types/index.d.ts" />

define('InstagramCollection',[
	'backbone',
  'ItemModelInstagram',
  'EventMediator',
	'ItemCollection',
], function (
  Backbone, ItemModelInstagram, EventMediator, ItemCollection
){

	var InstagramCollection = ItemCollection.extend({

      model: ItemModelInstagram,
      url: '/api/instagram',

      initialize: function(models: Backbone.Model[], options: any) : void{

				this.attributeSet({
					bounds : options.bounds,
					timeout : false,
					scrollTo : undefined,
					clusters : [],
					allModels : {},
					params : {
						lat: options.bounds.center.lat,
						lng: options.bounds.center.lng
					},
					settings : {
						hide: false,
						pause: false,
					},
				});

				this.fetchData(this.attributeGet('params'));
      },


			mapBoundsChange: function(data: App.Params) : void {
				this.attributeSet({
					bounds: data.bounds,
					clusters: data.clusters
				});

				const query: App.InstargramFetchParams = {
					lat: data.bounds.center.lat,
					lng: data.bounds.center.lng
				};

				const params: App.InstargramFetchParams = this.attributeGet('params');

        if(Math.abs(query.lat - params.lat)  < 0.0001 &&
          Math.abs(query.lng - params.lng) < 0.0001
        ) return;

        ItemCollection.prototype.mapBoundsChange.apply(this, [query])
			},

			clear: function(): void {
				ItemCollection.prototype.clear.apply(this)
        EventMediator.emit('instagram-cleared', null);
      },

    });

	return InstagramCollection;
});
