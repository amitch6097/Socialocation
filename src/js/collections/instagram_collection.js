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

      initialize: function(models, options){

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

        EventMediator.listen('map-bounds-changed', this.mapBoundsChange, this);
        EventMediator.listen('map-cluster-selected', this.mapClusterSelected, this);

				this.fetchData(this.attributeGet('params'));
      },

			mapBoundsChange: function(data){
				this.attributeSet({
					bounds: data.bounds,
					clusters: data.clusters
				});

				const query = {
					lat: data.bounds.center.lat,
					lng: data.bounds.center.lng
				};

				const params = this.attributeGet('params');

        if(Math.abs(query.lat - params.lat)  < 0.0001 &&
          Math.abs(query.lng - params.lng) < 0.0001
        ) return;

        ItemCollection.prototype.mapBoundsChange.apply(this, [query])
			},

			clear: function(){
				ItemCollection.prototype.clear.apply(this)
        EventMediator.emit('instagram-cleared', null);
      },

    });

	return InstagramCollection;
});
