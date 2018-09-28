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

      parse:function(data){
        return data;
      },

      initialize: function(models, options){
				this.bounds = options.bounds;
				this.params = {lat: this.bounds.center.lat, lng: this.bounds.center.lng};
        this.timeout = false;
        this.scrollTo = undefined;
        this.clusters = [];
        this.allModels = {};
        this.settings = {remove: false, collapse: false};

        EventMediator.listen('map-bounds-changed', this.mapBoundsChange, this);
        EventMediator.listen('map-cluster-selected', this.mapClusterSelected, this);

        this.fetchData(this.params);
				return this;
      },

			mapBoundsChange: function(data){
				this.bounds = data.bounds;
        this.clusters = data.clusters;
				data.query = {lat: this.bounds.center.lat, lng: this.bounds.center.lng};
        if(Math.abs(data.query.lat - this.params.lat)  < 0.0001 &&
          Math.abs(data.query.lng - this.params.lng) < 0.0001
        ) return;

        ItemCollection.prototype.mapBoundsChange.apply(this, [data])
			},

			clear: function(){
				ItemCollection.prototype.clear.apply(this)
        EventMediator.emit('instagram-clear', null);
      },

    });

	return InstagramCollection;
});
